const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// KULLANICI KAYIT İŞLEMİ
exports.register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    // 1. Email kullanımda mı kontrol et
    const userCheck = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: 'Bu e-posta adresi zaten kullanımda.' });
    }

    // 2. Şifreyi Hashle (Güvenlik için)
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // 3. Kullanıcıyı veritabanına kaydet
    const newUser = await db.query(
      'INSERT INTO users (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, email, department',
      [first_name, last_name, email, password_hash]
    );

    res.status(201).json({
      message: 'Kullanıcı başarıyla oluşturuldu.',
      user: newUser.rows[0]
    });

  } catch (error) {
    console.error('Kayıt hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası oluştu.' });
  }
};

// KULLANICI GİRİŞ İŞLEMİ
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Kullanıcıyı bul
    const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: 'Geçersiz e-posta veya şifre.' });
    }

    const user = userResult.rows[0];

    // 2. Şifreyi doğrula
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Geçersiz e-posta veya şifre.' });
    }

    // 3. JWT Oluştur (.env dosyasındaki JWT_SECRET'ı kullanıyoruz)
    const payload = {
      user: {
        id: user.id,
        email: user.email
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' }, // Token 7 gün geçerli olsun
      (err, token) => {
        if (err) throw err;
        res.json({
          message: 'Giriş başarılı.',
          token,
          user: { id: user.id, first_name: user.first_name, last_name: user.last_name }
        });
      }
    );

  } catch (error) {
    console.error('Giriş hatası:', error.message);
    res.status(500).json({ message: 'Sunucu hatası oluştu.' });
  }
};