const db = require('../config/db');
const { getRatingSummary } = require('../utils/userStats');

// ==========================================
// 1. UYUMLULUK SKORU HESAPLAYICI (Algoritma)
// ==========================================
function calculateCompatibilityScore(reqA, reqB) {
  let totalScore = 0;

  // DERS UYUMLULUĞU (%30) - Zorunlu
  if (reqA.course_id !== reqB.course_id) {
    return { isMatchEligible: false, totalScore: 0 };
  }
  totalScore += 30;

  // SEVİYE UYUMLULUĞU (%20)
  if (reqA.preferred_level === reqB.preferred_level) {
    totalScore += 20;
  } else {
    totalScore += 10;
  }

  // ÇALIŞMA TERCİHİ (%15)
  if (reqA.study_preferences === reqB.study_preferences) {
    totalScore += 15;
  }

  // Not: resources_owned ve reliability_rating veritabanında olmadığı için
  // şimdilik eşik değerini 50 yerine 40 olarak ayarlıyoruz.
  return {
    isMatchEligible: totalScore >= 40,
    totalScore: totalScore
  };
}

// ==========================================
// 2. ÇALIŞMA TALEBİ OLUŞTURMA VE EŞLEŞTİRME
// ==========================================
exports.createStudyRequest = async (req, res) => {
  const userId = req.user.id; 
  const { course_id, preferred_level, study_preferences } = req.body;

  try {
    // 1. Girdi ve Ders Kontrolü
    if (!course_id || !preferred_level) {
      return res.status(400).json({ message: 'Lütfen ders ve tercih edilen seviyeyi belirtin.' });
    }

    const courseCheck = await db.query('SELECT id FROM courses WHERE id = $1', [course_id]);
    if (courseCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Seçilen ders bulunamadı.' });
    }

    // 2. Aktif Talep Kontrolü (Spam Önleme)
    const activeRequestCheck = await db.query(
      'SELECT id FROM study_requests WHERE user_id = $1 AND course_id = $2 AND is_active = TRUE',
      [userId, course_id]
    );

    if (activeRequestCheck.rows.length > 0) {
      return res.status(400).json({ message: 'Bu ders için zaten aktif bir çalışma talebiniz bulunuyor.' });
    }

    // 3. Yeni Talebi Veritabanına Kaydet
    const newRequestQuery = await db.query(
      `INSERT INTO study_requests (user_id, course_id, preferred_level, study_preferences) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [userId, course_id, preferred_level, study_preferences]
    );
    const newRequest = newRequestQuery.rows[0];

    // 4. Eşleşme Havuzunu Tara (Aynı dersi alan diğer aktif talepler)
    const pendingRequests = await db.query(
      `SELECT * FROM study_requests WHERE course_id = $1 AND is_active = TRUE AND user_id != $2`,
      [course_id, userId]
    );

    let bestMatch = null;
    let highestScore = -1;

    for (const candidate of pendingRequests.rows) {
      const result = calculateCompatibilityScore(newRequest, candidate);
      
      if (result.isMatchEligible && result.totalScore > highestScore) {
        highestScore = result.totalScore;
        bestMatch = { candidate, score: result.totalScore };
      }
    }

    // 5. Eşleşme Bulunduysa Veritabanını Güncelle
    if (bestMatch) {
      const matchResult = await db.query(
        `INSERT INTO matches (user1_id, user2_id, study_request1_id, study_request2_id, compatibility_score) 
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [newRequest.user_id, bestMatch.candidate.user_id, newRequest.id, bestMatch.candidate.id, bestMatch.score]
      );

      // İki talebi de pasif duruma getir
      await db.query(`UPDATE study_requests SET is_active = FALSE WHERE id IN ($1, $2)`, 
        [newRequest.id, bestMatch.candidate.id]
      );

      return res.status(201).json({
        message: 'Talebiniz alındı ve harika bir eşleşme bulundu!',
        match: matchResult.rows[0]
      });
    }

    // 6. Eşleşme Bulunamadıysa Havuza Bırak
    res.status(201).json({
      message: 'Talebiniz alındı, havuza eklendi. Uygun biri bulunduğunda eşleşeceksiniz.',
      request: newRequest
    });

  } catch (error) {
    console.error('Çalışma talebi oluşturma hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};

const MATCH_DETAIL_SQL = `
  SELECT
    m.*,
    c.id AS course_id,
    c.course_code,
    c.course_name,
    sr1.preferred_level AS request1_level,
    sr1.study_preferences AS request1_preferences,
    sr2.preferred_level AS request2_level,
    sr2.study_preferences AS request2_preferences,
    u1.first_name AS user1_first_name,
    u1.last_name AS user1_last_name,
    u1.department AS user1_department,
    u2.first_name AS user2_first_name,
    u2.last_name AS user2_last_name,
    u2.department AS user2_department
  FROM matches m
  JOIN study_requests sr1 ON sr1.id = m.study_request1_id
  JOIN study_requests sr2 ON sr2.id = m.study_request2_id
  JOIN courses c ON c.id = sr1.course_id
  JOIN users u1 ON u1.id = m.user1_id
  JOIN users u2 ON u2.id = m.user2_id
`;

function shapeMatch(row, currentUserId) {
  const isUser1 = row.user1_id === currentUserId;
  const partner = isUser1
    ? {
        id: row.user2_id,
        first_name: row.user2_first_name,
        last_name: row.user2_last_name,
        department: row.user2_department,
        preferred_level: row.request2_level,
        study_preferences: row.request2_preferences
      }
    : {
        id: row.user1_id,
        first_name: row.user1_first_name,
        last_name: row.user1_last_name,
        department: row.user1_department,
        preferred_level: row.request1_level,
        study_preferences: row.request1_preferences
      };

  return {
    id: row.id,
    compatibility_score: Number(row.compatibility_score),
    is_active: row.is_active,
    created_at: row.created_at,
    course: {
      id: row.course_id,
      course_code: row.course_code,
      course_name: row.course_name
    },
    my_request: {
      preferred_level: isUser1 ? row.request1_level : row.request2_level,
      study_preferences: isUser1 ? row.request1_preferences : row.request2_preferences
    },
    partner
  };
}

exports.listMyRequests = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT sr.*, c.course_code, c.course_name
       FROM study_requests sr
       JOIN courses c ON c.id = sr.course_id
       WHERE sr.user_id = $1
       ORDER BY sr.created_at DESC`,
      [req.user.id]
    );

    res.json({
      message: 'Çalışma talepleriniz getirildi.',
      requests: result.rows
    });
  } catch (error) {
    console.error('Talep listeleme hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};

exports.cancelStudyRequest = async (req, res) => {
  try {
    const result = await db.query(
      'SELECT * FROM study_requests WHERE id = $1',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Talep bulunamadı.' });
    }

    const studyRequest = result.rows[0];
    if (studyRequest.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Bu talebi iptal etme yetkiniz yok.' });
    }

    if (!studyRequest.is_active) {
      return res.status(400).json({ message: 'Bu talep zaten aktif değil.' });
    }

    const updated = await db.query(
      `UPDATE study_requests SET is_active = FALSE WHERE id = $1 RETURNING *`,
      [studyRequest.id]
    );

    res.json({
      message: 'Çalışma talebi iptal edildi.',
      request: updated.rows[0]
    });
  } catch (error) {
    console.error('Talep iptal hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};

exports.listMatches = async (req, res) => {
  try {
    const userId = req.user.id;
    const params = [userId];
    let activeFilter = '';

    if (req.query.active === 'true') {
      activeFilter = 'AND m.is_active = TRUE';
    } else if (req.query.active === 'false') {
      activeFilter = 'AND m.is_active = FALSE';
    }

    const result = await db.query(
      `${MATCH_DETAIL_SQL}
       WHERE (m.user1_id = $1 OR m.user2_id = $1)
       ${activeFilter}
       ORDER BY m.created_at DESC`,
      params
    );

    res.json({
      message: 'Eşleşmeler getirildi.',
      matches: result.rows.map((row) => shapeMatch(row, userId))
    });
  } catch (error) {
    console.error('Eşleşme listeleme hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};

exports.getMatch = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await db.query(
      `${MATCH_DETAIL_SQL} WHERE m.id = $1`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Eşleşme bulunamadı.' });
    }

    const row = result.rows[0];
    if (row.user1_id !== userId && row.user2_id !== userId) {
      return res.status(403).json({ message: 'Bu eşleşmeye erişim yetkiniz yok.' });
    }

    const match = shapeMatch(row, userId);
    const partnerRating = await getRatingSummary(match.partner.id);

    res.json({
      message: 'Eşleşme bilgisi getirildi.',
      match: {
        ...match,
        partner: {
          ...match.partner,
          ...partnerRating
        }
      }
    });
  } catch (error) {
    console.error('Eşleşme getirme hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};