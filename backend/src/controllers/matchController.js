const db = require('../config/db');

// ÇALIŞMA TALEBİ OLUŞTURMA
exports.createStudyRequest = async (req, res) => {
  // Kullanıcı ID'sini authMiddleware'den güvenli bir şekilde alıyoruz
  const userId = req.user.id; 
  
  // Frontend'den alacağımız veriler
  const { course_id, preferred_level, study_preferences } = req.body;

  try {
    // 1. Gerekli alanların doldurulduğunu kontrol et
    if (!course_id || !preferred_level) {
      return res.status(400).json({ message: 'Lütfen ders ve tercih edilen seviyeyi belirtin.' });
    }

    // 2. Dersin veritabanında gerçekten var olup olmadığını kontrol et
    const courseCheck = await db.query('SELECT * FROM courses WHERE id = $1', [course_id]);
    if (courseCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Seçilen ders bulunamadı.' });
    }

    // 3. Kullanıcının bu ders için aktif bir talebi zaten var mı kontrol et (Spam önleme)
    const activeRequestCheck = await db.query(
      'SELECT * FROM study_requests WHERE user_id = $1 AND course_id = $2 AND is_active = TRUE',
      [userId, course_id]
    );

    if (activeRequestCheck.rows.length > 0) {
      return res.status(400).json({ message: 'Bu ders için zaten aktif bir çalışma talebiniz bulunuyor.' });
    }

    // 4. Talebi veritabanına kaydet
    const newRequest = await db.query(
      `INSERT INTO study_requests (user_id, course_id, preferred_level, study_preferences) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [userId, course_id, preferred_level, study_preferences]
    );

    res.status(201).json({
      message: 'Çalışma talebiniz başarıyla oluşturuldu.',
      request: newRequest.rows[0]
    });

  } catch (error) {
    console.error('Çalışma talebi oluşturma hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};