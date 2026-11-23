-- 1. app_backend rolünü oluştur ve temel şema/tablo yetkilerini ver
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'app_backend') THEN
    CREATE ROLE app_backend NOLOGIN;
  END IF;
END
$$;

GRANT USAGE ON SCHEMA public TO app_backend;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_backend;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO app_backend;

-- 2. Backend kullanıcı bağlamı fonksiyonu (Node.js JWT / session uyumlu)
CREATE OR REPLACE FUNCTION public.current_app_user_id()
RETURNS UUID
LANGUAGE SQL
STABLE
AS $$
  SELECT NULLIF(current_setting('app.user_id', true), '')::UUID;
$$;

-- 3. Dış erişimleri (anon & authenticated) tamamen kapat
REVOKE ALL PRIVILEGES ON public.active_matching_pool FROM anon, authenticated;
REVOKE ALL PRIVILEGES ON TABLE
  public.admins, public.courses, public.group_members, public.matches,
  public.ratings, public.reports, public.resources, public.sessions,
  public.study_groups, public.study_requests, public.user_courses, public.users
FROM anon, authenticated;

GRANT SELECT ON public.active_matching_pool TO app_backend;
ALTER VIEW public.active_matching_pool SET (security_invoker = true);

-- 4. 12 tablonun tamamında RLS'i aktif et
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 5. Eski politikaları temizle
DROP POLICY IF EXISTS "Kullanıcılar yalnızca kendi profillerini güncelleyebilir" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Backend can read and register users" ON public.users;
DROP POLICY IF EXISTS "Sadece aktif talepler görüntülenebilir" ON public.study_requests;
DROP POLICY IF EXISTS "Users can view active study requests" ON public.study_requests;
DROP POLICY IF EXISTS "Users can create their own study requests" ON public.study_requests;
DROP POLICY IF EXISTS "Backend can update study requests" ON public.study_requests;

-- 6. Users politikaları (Login, Register ve Profil/Sayaç güncelleme)
CREATE POLICY "Backend can read users"
ON public.users FOR SELECT TO app_backend USING (true);

CREATE POLICY "Backend can register users"
ON public.users FOR INSERT TO app_backend WITH CHECK (true);

CREATE POLICY "Users can update their own profile"
ON public.users FOR UPDATE TO app_backend
USING (id = COALESCE(public.current_app_user_id(), id))
WITH CHECK (id = COALESCE(public.current_app_user_id(), id));

-- 7. Study Requests politikaları (Havuz tarama, talep açma ve eşleşme sonrası pasife çekme)
CREATE POLICY "Users can view study requests"
ON public.study_requests FOR SELECT TO app_backend
USING (is_active = TRUE OR user_id = COALESCE(public.current_app_user_id(), user_id));

CREATE POLICY "Users can create their own study requests"
ON public.study_requests FOR INSERT TO app_backend
WITH CHECK (user_id = COALESCE(public.current_app_user_id(), user_id));

CREATE POLICY "Backend can update study requests"
ON public.study_requests FOR UPDATE TO app_backend
USING (true) WITH CHECK (true);

-- 8. Diğer uygulama tabloları için app_backend politikaları
CREATE POLICY "Backend full access courses" ON public.courses FOR SELECT TO app_backend USING (true);
CREATE POLICY "Backend full access user_courses" ON public.user_courses FOR ALL TO app_backend USING (true) WITH CHECK (true);
CREATE POLICY "Backend full access matches" ON public.matches FOR ALL TO app_backend USING (true) WITH CHECK (true);
CREATE POLICY "Backend full access sessions" ON public.sessions FOR ALL TO app_backend USING (true) WITH CHECK (true);
CREATE POLICY "Backend full access ratings" ON public.ratings FOR ALL TO app_backend USING (true) WITH CHECK (true);
CREATE POLICY "Backend full access resources" ON public.resources FOR ALL TO app_backend USING (true) WITH CHECK (true);
CREATE POLICY "Backend full access study_groups" ON public.study_groups FOR ALL TO app_backend USING (true) WITH CHECK (true);
CREATE POLICY "Backend full access group_members" ON public.group_members FOR ALL TO app_backend USING (true) WITH CHECK (true);
CREATE POLICY "Backend full access reports" ON public.reports FOR ALL TO app_backend USING (true) WITH CHECK (true);
CREATE POLICY "Backend read admins" ON public.admins FOR SELECT TO app_backend USING (true);
