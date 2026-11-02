const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'Yetki reddedildi, token bulunamadı.' });
  }

  try {
    // "Bearer <token>" formatından sadece token kısmını alıyoruz
    const token = authHeader.split(' ')[1];
    
    // Token'ı doğrula
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Kullanıcı bilgisini req nesnesine ekle
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Geçersiz veya süresi dolmuş token.' });
  }
};