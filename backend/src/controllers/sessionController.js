const db = require('../config/db');
const {
  FREE_DAILY_SESSION_LIMIT,
  getTodaysSessionCount,
  getSessionDurationMinutes,
  getRatingSummary
} = require('../utils/userStats');

function remainingSeconds(startTime, durationMinutes) {
  const endsAt = new Date(new Date(startTime).getTime() + durationMinutes * 60 * 1000);
  return Math.max(0, Math.floor((endsAt - new Date()) / 1000));
}

async function isEitherPremium(user1Id, user2Id) {
  const result = await db.query(
    'SELECT bool_or(is_premium) AS is_premium FROM users WHERE id IN ($1, $2)',
    [user1Id, user2Id]
  );
  return result.rows[0].is_premium === true;
}

function formatSession(session, extras = {}) {
  return {
    ...session,
    ...extras
  };
}

exports.getUsage = async (req, res) => {
  try {
    const userId = req.user.id;
    const userResult = await db.query(
      'SELECT is_premium, daily_session_count FROM users WHERE id = $1',
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    const usedToday = await getTodaysSessionCount(userId);
    const { is_premium } = userResult.rows[0];

    res.json({
      message: 'Günlük kullanım bilgisi getirildi.',
      usage: {
        is_premium,
        used_today: usedToday,
        daily_limit: is_premium ? null : FREE_DAILY_SESSION_LIMIT,
        remaining_today: is_premium ? null : Math.max(0, FREE_DAILY_SESSION_LIMIT - usedToday),
        session_minutes: getSessionDurationMinutes(is_premium)
      }
    });
  } catch (error) {
    console.error('Kullanım bilgisi hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};

exports.listSessions = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status } = req.query;

    const params = [userId];
    let statusFilter = '';
    if (status) {
      params.push(status);
      statusFilter = `AND s.status = $${params.length}`;
    }

    const result = await db.query(
      `SELECT s.*, m.compatibility_score, m.user1_id, m.user2_id,
              c.id AS course_id, c.course_code, c.course_name
       FROM sessions s
       JOIN matches m ON s.match_id = m.id
       JOIN study_requests sr ON sr.id = m.study_request1_id
       JOIN courses c ON c.id = sr.course_id
       WHERE (m.user1_id = $1 OR m.user2_id = $1)
       ${statusFilter}
       ORDER BY s.start_time DESC`,
      params
    );

    res.json({
      message: 'Oturumlar başarıyla getirildi.',
      sessions: result.rows
    });
  } catch (error) {
    console.error('Oturum listeleme hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};

exports.getSession = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await db.query(
      `SELECT s.*, m.compatibility_score, m.user1_id, m.user2_id, m.is_active AS match_is_active,
              c.id AS course_id, c.course_code, c.course_name
       FROM sessions s
       JOIN matches m ON s.match_id = m.id
       JOIN study_requests sr ON sr.id = m.study_request1_id
       JOIN courses c ON c.id = sr.course_id
       WHERE s.id = $1`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Oturum bulunamadı.' });
    }

    const session = result.rows[0];
    if (session.user1_id !== userId && session.user2_id !== userId) {
      return res.status(403).json({ message: 'Bu oturuma erişim yetkiniz yok.' });
    }

    const partnerId = session.user1_id === userId ? session.user2_id : session.user1_id;
    const partnerResult = await db.query(
      'SELECT id, first_name, last_name, department, is_premium FROM users WHERE id = $1',
      [partnerId]
    );
    const premium = await isEitherPremium(session.user1_id, session.user2_id);
    const durationMinutes = getSessionDurationMinutes(premium);
    const partnerRating = await getRatingSummary(partnerId);

    const resources = await db.query(
      'SELECT id, user_id, course_id, resource_type, file_url, uploaded_at FROM resources WHERE session_id = $1 ORDER BY uploaded_at DESC',
      [session.id]
    );

    res.json({
      message: 'Oturum bilgisi getirildi.',
      session: formatSession(session, {
        duration_minutes: durationMinutes,
        remaining_seconds: session.status === 'active' ? remainingSeconds(session.start_time, durationMinutes) : 0,
        partner: {
          ...partnerResult.rows[0],
          ...partnerRating
        },
        resources: resources.rows
      })
    });
  } catch (error) {
    console.error('Oturum getirme hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};

exports.startSession = async (req, res) => {
  const userId = req.user.id;
  const { match_id } = req.body;

  if (!match_id) {
    return res.status(400).json({ message: 'Eşleşme kimliği (match_id) zorunludur.' });
  }

  const client = await db.pool.connect();

  try {
    await client.query('BEGIN');

    const matchResult = await client.query(
      'SELECT * FROM matches WHERE id = $1 FOR UPDATE',
      [match_id]
    );

    if (matchResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ message: 'Eşleşme bulunamadı.' });
    }

    const match = matchResult.rows[0];
    if (match.user1_id !== userId && match.user2_id !== userId) {
      await client.query('ROLLBACK');
      return res.status(403).json({ message: 'Bu eşleşmeye erişim yetkiniz yok.' });
    }

    if (!match.is_active) {
      await client.query('ROLLBACK');
      return res.status(400).json({ message: 'Bu eşleşme artık aktif değil.' });
    }

    const activeSession = await client.query(
      `SELECT id FROM sessions WHERE match_id = $1 AND status = 'active'`,
      [match_id]
    );

    if (activeSession.rows.length > 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({
        message: 'Bu eşleşme için zaten aktif bir oturum var.',
        session_id: activeSession.rows[0].id
      });
    }

    const userResult = await client.query(
      'SELECT is_premium FROM users WHERE id = $1',
      [userId]
    );
    const isPremium = userResult.rows[0].is_premium === true;

    if (!isPremium) {
      const usedToday = await getTodaysSessionCount(userId);
      if (usedToday >= FREE_DAILY_SESSION_LIMIT) {
        await client.query('ROLLBACK');
        return res.status(403).json({
          message: `Ücretsiz günlük oturum hakkınız doldu (${FREE_DAILY_SESSION_LIMIT}). Premium ile devam edebilirsiniz.`
        });
      }
    }

    const sessionResult = await client.query(
      `INSERT INTO sessions (match_id, status)
       VALUES ($1, 'active')
       RETURNING *`,
      [match_id]
    );

    await client.query(
      `UPDATE users
       SET daily_session_count = daily_session_count + 1
       WHERE id = $1`,
      [userId]
    );

    await client.query('COMMIT');

    const durationMinutes = getSessionDurationMinutes(
      await isEitherPremium(match.user1_id, match.user2_id)
    );

    res.status(201).json({
      message: 'Çalışma oturumu başlatıldı.',
      session: formatSession(sessionResult.rows[0], {
        duration_minutes: durationMinutes,
        remaining_seconds: remainingSeconds(sessionResult.rows[0].start_time, durationMinutes)
      })
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Oturum başlatma hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  } finally {
    client.release();
  }
};

exports.endSession = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await db.query(
      `SELECT s.*, m.user1_id, m.user2_id
       FROM sessions s
       JOIN matches m ON s.match_id = m.id
       WHERE s.id = $1`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Oturum bulunamadı.' });
    }

    const session = result.rows[0];
    if (session.user1_id !== userId && session.user2_id !== userId) {
      return res.status(403).json({ message: 'Bu oturuma erişim yetkiniz yok.' });
    }

    if (session.status !== 'active') {
      return res.status(400).json({ message: 'Oturum zaten sonlandırılmış.' });
    }

    const updated = await db.query(
      `UPDATE sessions
       SET status = 'completed', end_time = NOW()
       WHERE id = $1
       RETURNING *`,
      [session.id]
    );

    res.json({
      message: 'Oturum sonlandırıldı.',
      session: updated.rows[0]
    });
  } catch (error) {
    console.error('Oturum sonlandırma hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};
