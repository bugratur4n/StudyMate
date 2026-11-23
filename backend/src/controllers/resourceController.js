const db = require('../config/db');

async function assertSessionAccess(sessionId, userId) {
  const result = await db.query(
    `SELECT s.id, s.status, m.user1_id, m.user2_id
     FROM sessions s
     JOIN matches m ON s.match_id = m.id
     WHERE s.id = $1`,
    [sessionId]
  );

  if (result.rows.length === 0) {
    return { error: { status: 404, message: 'Oturum bulunamadı.' } };
  }

  const session = result.rows[0];
  if (session.user1_id !== userId && session.user2_id !== userId) {
    return { error: { status: 403, message: 'Bu oturuma kaynak ekleme yetkiniz yok.' } };
  }

  return { session };
}

exports.listResources = async (req, res) => {
  try {
    const userId = req.user.id;
    const { course_id, session_id } = req.query;
    const params = [userId];
    const filters = ['r.user_id = $1'];

    if (course_id) {
      params.push(course_id);
      filters.push(`r.course_id = $${params.length}`);
    }

    if (session_id) {
      params.push(session_id);
      filters.push(`r.session_id = $${params.length}`);
    }

    const result = await db.query(
      `SELECT r.id, r.user_id, r.course_id, r.session_id, r.resource_type, r.file_url, r.uploaded_at,
              c.course_code, c.course_name
       FROM resources r
       JOIN courses c ON c.id = r.course_id
       WHERE ${filters.join(' AND ')}
       ORDER BY r.uploaded_at DESC`,
      params
    );

    res.json({
      message: 'Kaynaklar başarıyla getirildi.',
      resources: result.rows
    });
  } catch (error) {
    console.error('Kaynak listeleme hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};

exports.createResource = async (req, res) => {
  try {
    const userId = req.user.id;
    const { course_id, session_id, resource_type, file_url } = req.body;

    if (!course_id || !file_url) {
      return res.status(400).json({ message: 'course_id ve file_url zorunludur.' });
    }

    const courseCheck = await db.query('SELECT id FROM courses WHERE id = $1', [course_id]);
    if (courseCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Seçilen ders bulunamadı.' });
    }

    if (session_id) {
      const access = await assertSessionAccess(session_id, userId);
      if (access.error) {
        return res.status(access.error.status).json({ message: access.error.message });
      }
    }

    const result = await db.query(
      `INSERT INTO resources (user_id, course_id, session_id, resource_type, file_url)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [userId, course_id, session_id || null, resource_type || null, file_url]
    );

    res.status(201).json({
      message: 'Kaynak kaydedildi.',
      resource: result.rows[0]
    });
  } catch (error) {
    console.error('Kaynak oluşturma hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};

exports.deleteResource = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await db.query(
      'SELECT id, user_id FROM resources WHERE id = $1',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Kaynak bulunamadı.' });
    }

    if (result.rows[0].user_id !== userId) {
      return res.status(403).json({ message: 'Bu kaynağı silme yetkiniz yok.' });
    }

    await db.query('DELETE FROM resources WHERE id = $1', [req.params.id]);

    res.json({ message: 'Kaynak silindi.' });
  } catch (error) {
    console.error('Kaynak silme hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};
