exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    -- Fırat Üniversitesi Bilgisayar Mühendisliği Örnek Dersleri
    INSERT INTO courses (course_code, course_name) VALUES 
    ('BMÜ313', 'Biçimsel Diller ve Otomata Teo.'),
    ('BMÜ325', 'Programlama Dilleri'),
    ('BMÜ329', 'Veri Tabanı Sistemleri'),
    ('BMÜ333', 'Mikroişlemciler'),
    ('BMÜ401', 'Bilgisayar Müh. Tasarım'),
    ('BMÜ425', 'İnternet Programlama'),
    ('BMÜ431', 'Bilgisayar Sistemleri Lab'),
    ('BMÜ463', 'Dağıtık Sistemler'),
    ('BMÜ491', 'Fikri ve Sınai Mülkiyet'),
    ('BMÜ495', 'İş Hukuku');

    -- Örnek Kullanıcıların Eklenmesi
    INSERT INTO users (first_name, last_name, email, password_hash, is_premium) VALUES 
    ('Rana', 'Özgül', 'rana.o@firat.edu.tr', 'hashed_pw_1', TRUE),
    ('Ahmet', 'Yılmaz', 'ahmet.y@firat.edu.tr', 'hashed_pw_2', FALSE),
    ('Ayşe', 'Demir', 'ayse.d@firat.edu.tr', 'hashed_pw_3', FALSE);

    -- Kullanıcı - Ders Eşleştirmeleri (Profil bilgisi)
    INSERT INTO user_courses (user_id, course_id, proficiency_level)
    SELECT u.id, c.id, 'İleri Seviye' 
    FROM users u, courses c 
    WHERE u.email = 'rana.o@firat.edu.tr' AND c.course_code = 'BMÜ329';

    INSERT INTO user_courses (user_id, course_id, proficiency_level)
    SELECT u.id, c.id, 'Orta Seviye' 
    FROM users u, courses c 
    WHERE u.email = 'ahmet.y@firat.edu.tr' AND c.course_code = 'BMÜ329';

    -- Örnek Çalışma Talebi
    INSERT INTO study_requests (user_id, course_id, preferred_level, study_preferences)
    SELECT u.id, c.id, 'Fark Etmez', 'Final sınavı öncesi birlikte soru çözümü yapmak istiyorum.'
    FROM users u, courses c
    WHERE u.email = 'rana.o@firat.edu.tr' AND c.course_code = 'BMÜ329';
  `);
};

exports.down = (pgm) => {
  // Geri alma işlemi yapılırsa sadece bu örnek verileri siler (tablolar kalır)
  pgm.sql(`
    DELETE FROM study_requests;
    DELETE FROM user_courses;
    DELETE FROM users;
    DELETE FROM courses;
  `);
};