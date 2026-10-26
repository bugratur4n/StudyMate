-- Tablolarda RLS'i aktif hale getirme
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_requests ENABLE ROW LEVEL SECURITY;

-- Kural 1: Her kullanıcı yalnızca kendi profil bilgilerini güncelleyebilir
CREATE POLICY "Kullanıcılar yalnızca kendi profillerini güncelleyebilir" 
ON users 
FOR UPDATE 
USING (auth.uid() = id);

-- Kural 2: Diğer kullanıcılar yalnızca "aktif" olan çalışma taleplerini görebilir
CREATE POLICY "Sadece aktif talepler görüntülenebilir" 
ON study_requests 
FOR SELECT 
USING (is_active = true);

-- Eşleştirme algoritması için optimize edilmiş sanal tablo
CREATE OR REPLACE VIEW active_matching_pool AS
SELECT 
    sr.id AS request_id,
    u.id AS user_id,
    u.first_name || ' ' || u.last_name AS user_full_name,
    c.id AS course_id,
    c.course_code,
    c.course_name,
    sr.preferred_level,
    sr.study_preferences,
    -- Oturum geçmişine göre kullanıcının güvenilirlik ve kaynak puanı altyapısı
    (SELECT COALESCE(AVG(reliability_score), 5) FROM ratings WHERE reviewee_id = u.id) AS avg_reliability_score,
    sr.created_at
FROM study_requests sr
JOIN users u ON sr.user_id = u.id
JOIN courses c ON sr.course_id = c.id
WHERE sr.is_active = true;
