const bcrypt = require('bcryptjs');
const db = require('../config/db');
const { getRatingSummary, getTodaysSessionCount, FREE_DAILY_SESSION_LIMIT, getSessionDurationMinutes } = require('../utils/userStats');

async function getUserCourses(userId) {
  const coursesResult = await db.query(
    `SELECT c.id, c.course_code, c.course_name, uc.proficiency_level
     FROM user_courses uc
     JOIN courses c ON uc.course_id = c.id
     WHERE uc.user_id = $1
     ORDER BY c.course_code`,
    [userId]
  );
  return coursesResult.rows;
}

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const userResult = await db.query(
      'SELECT id, first_name, last_name, email, department, is_premium, daily_session_count FROM users WHERE id = $1',
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    const user = userResult.rows[0];
    const [courses, rating, usedToday] = await Promise.all([
      getUserCourses(userId),
      getRatingSummary(userId),
      getTodaysSessionCount(userId)
    ]);

    res.json({
      message: 'Profil bilgileri başarıyla getirildi.',
      user: {
        ...user,
        ...rating,
        courses,
        usage: {
          used_today: usedToday,
          daily_limit: user.is_premium ? null : FREE_DAILY_SESSION_LIMIT,
          remaining_today: user.is_premium ? null : Math.max(0, FREE_DAILY_SESSION_LIMIT - usedToday),
          session_minutes: getSessionDurationMinutes(user.is_premium)
        }
      }
    });
  } catch (error) {
    console.error('Profil getirme hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { first_name, last_name, department } = req.body;

    const current = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
    if (current.rows.length === 0) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    const updated = await db.query(
      `UPDATE users
       SET first_name = COALESCE($1, first_name),
           last_name = COALESCE($2, last_name),
           department = COALESCE($3, department)
       WHERE id = $4
       RETURNING id, first_name, last_name, email, department, is_premium`,
      [first_name || null, last_name || null, department || null, userId]
    );

    res.json({
      message: 'Profil güncellendi.',
      user: updated.rows[0]
    });
  } catch (error) {
    console.error('Profil güncelleme hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { current_password, new_password } = req.body;
    if (!current_password || !new_password) {
      return res.status(400).json({ message: 'Mevcut ve yeni şifre zorunludur.' });
    }

    if (new_password.length < 6) {
      return res.status(400).json({ message: 'Yeni şifre en az 6 karakter olmalıdır.' });
    }

    const userResult = await db.query('SELECT password_hash FROM users WHERE id = $1', [req.user.id]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    const isMatch = await bcrypt.compare(current_password, userResult.rows[0].password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mevcut şifre hatalı.' });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(new_password, salt);
    await db.query('UPDATE users SET password_hash = $1 WHERE id = $2', [password_hash, req.user.id]);

    res.json({ message: 'Şifre güncellendi.' });
  } catch (error) {
    console.error('Şifre güncelleme hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};

exports.setPremium = async (req, res) => {
  try {
    const { is_premium } = req.body;
    if (typeof is_premium !== 'boolean') {
      return res.status(400).json({ message: 'is_premium boolean olmalıdır.' });
    }

    const updated = await db.query(
      `UPDATE users SET is_premium = $1 WHERE id = $2
       RETURNING id, first_name, last_name, email, department, is_premium`,
      [is_premium, req.user.id]
    );

    res.json({
      message: is_premium ? 'Premium durumunuz açıldı.' : 'Premium durumunuz kapatıldı.',
      user: updated.rows[0]
    });
  } catch (error) {
    console.error('Premium güncelleme hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};

exports.getPublicProfile = async (req, res) => {
  try {
    const userResult = await db.query(
      'SELECT id, first_name, last_name, department, is_premium FROM users WHERE id = $1',
      [req.params.id]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
    }

    const [courses, rating] = await Promise.all([
      getUserCourses(req.params.id),
      getRatingSummary(req.params.id)
    ]);

    res.json({
      message: 'Kullanıcı profili getirildi.',
      user: {
        ...userResult.rows[0],
        ...rating,
        courses
      }
    });
  } catch (error) {
    console.error('Herkese açık profil hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};

exports.listMyCourses = async (req, res) => {
  try {
    const courses = await getUserCourses(req.user.id);
    res.json({
      message: 'Dersleriniz getirildi.',
      courses
    });
  } catch (error) {
    console.error('Kullanıcı dersleri hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};

exports.addCourse = async (req, res) => {
  try {
    const { course_id, proficiency_level } = req.body;
    if (!course_id) {
      return res.status(400).json({ message: 'course_id zorunludur.' });
    }

    const courseCheck = await db.query('SELECT id FROM courses WHERE id = $1', [course_id]);
    if (courseCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Seçilen ders bulunamadı.' });
    }

    await db.query(
      `INSERT INTO user_courses (user_id, course_id, proficiency_level)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, course_id)
       DO UPDATE SET proficiency_level = EXCLUDED.proficiency_level`,
      [req.user.id, course_id, proficiency_level || null]
    );

    const courses = await getUserCourses(req.user.id);

    res.status(201).json({
      message: 'Ders profilinize eklendi.',
      courses
    });
  } catch (error) {
    console.error('Ders ekleme hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};

exports.removeCourse = async (req, res) => {
  try {
    const result = await db.query(
      'DELETE FROM user_courses WHERE user_id = $1 AND course_id = $2 RETURNING course_id',
      [req.user.id, req.params.courseId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Bu ders profilinizde kayıtlı değil.' });
    }

    res.json({ message: 'Ders profilinizden kaldırıldı.' });
  } catch (error) {
    console.error('Ders silme hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası.' });
  }
};
