const { Pool } = require('pg');
require('dotenv').config();

// .env dosyasından veritabanı bilgilerini alıyoruz
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Bağlantı başarılı olduğunda bilgi ver
pool.on('connect', () => {
  console.log('PostgreSQL veritabanına başarıyla bağlanıldı.');
});

// Beklenmeyen hataları yakala
pool.on('error', (err) => {
  console.error('Beklenmeyen bir veritabanı hatası oluştu:', err);
  process.exit(-1);
});

// İleride diğer dosyalardan veritabanına sorgu (query) atabilmek için dışa aktarıyoruz
module.exports = {
  query: (text, params) => pool.query(text, params),
  pool, // İleride transaction (rollback/commit) işlemleri gerekirse diye pool'un kendisini de aktaralım
};