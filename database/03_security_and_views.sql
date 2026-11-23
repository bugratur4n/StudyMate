BEGIN;

-- 1. Backend rolü: login açık, RLS bypass kapalı olmalı.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_roles WHERE rolname = 'app_backend'
    ) THEN
        CREATE ROLE app_backend LOGIN;
    END IF;
END
$$;

GRANT USAGE ON SCHEMA public TO app_backend;
GRANT SELECT, INSERT, UPDATE, DELETE
    ON ALL TABLES IN SCHEMA public TO app_backend;
GRANT USAGE, SELECT
    ON ALL SEQUENCES IN SCHEMA public TO app_backend;

-- 2. JWT doğrulamasından gelen kullanıcı ID'sini transaction context'ten oku.
CREATE OR REPLACE FUNCTION public.current_app_user_id()
RETURNS UUID
LANGUAGE SQL
STABLE
AS $$
    SELECT NULLIF(current_setting('app.user_id', true), '')::UUID;
$$;

GRANT EXECUTE ON FUNCTION public.current_app_user_id() TO app_backend;

-- 3. Önceden tanımlanmış geniş politikaları kaldır.
DROP POLICY IF EXISTS "Backend read admins" ON public.admins;
DROP POLICY IF EXISTS "Backend full access courses" ON public.courses;
DROP POLICY IF EXISTS "Backend full access group_members" ON public.group_members;
DROP POLICY IF EXISTS "Backend full access matches" ON public.matches;
DROP POLICY IF EXISTS "Backend full access ratings" ON public.ratings;
DROP POLICY IF EXISTS "Backend full access reports" ON public.reports;
DROP POLICY IF EXISTS "Backend full access resources" ON public.resources;
DROP POLICY IF EXISTS "Backend full access sessions" ON public.sessions;
DROP POLICY IF EXISTS "Backend full access study_groups" ON public.study_groups;
DROP POLICY IF EXISTS "Backend full access user_courses" ON public.user_courses;

DROP POLICY IF EXISTS "Backend read users" ON public.users;
DROP POLICY IF EXISTS "Backend insert users" ON public.users;
DROP POLICY IF EXISTS "Backend update users" ON public.users;

DROP POLICY IF EXISTS "Backend read study_requests" ON public.study_requests;
DROP POLICY IF EXISTS "Backend insert study_requests" ON public.study_requests;
DROP POLICY IF EXISTS "Backend update study_requests" ON public.study_requests;

-- 4. RLS etkinleştir.
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- 5. USERS
-- SELECT true: girişte e-posta kontrolü ve eşleştirme görünümü için korunmuştur.
CREATE POLICY users_backend_select
ON public.users FOR SELECT TO app_backend
USING (true);

CREATE POLICY users_backend_insert
ON public.users FOR INSERT TO app_backend
WITH CHECK (id = public.current_app_user_id());

CREATE POLICY users_backend_update
ON public.users FOR UPDATE TO app_backend
USING (id = public.current_app_user_id())
WITH CHECK (id = public.current_app_user_id());

CREATE POLICY users_backend_delete
ON public.users FOR DELETE TO app_backend
USING (id = public.current_app_user_id());

-- 6. COURSES
CREATE POLICY courses_backend_select
ON public.courses FOR SELECT TO app_backend
USING (true);

-- 7. USER_COURSES
CREATE POLICY user_courses_backend_all
ON public.user_courses FOR ALL TO app_backend
USING (user_id = public.current_app_user_id())
WITH CHECK (user_id = public.current_app_user_id());

-- 8. STUDY_REQUESTS
-- Aktif talepler eşleştirme havuzunda görünür; pasif talepler yalnızca sahibine görünür.
CREATE POLICY study_requests_backend_select
ON public.study_requests FOR SELECT TO app_backend
USING (
    is_active = true
    OR user_id = public.current_app_user_id()
);

CREATE POLICY study_requests_backend_insert
ON public.study_requests FOR INSERT TO app_backend
WITH CHECK (user_id = public.current_app_user_id());

CREATE POLICY study_requests_backend_update
ON public.study_requests FOR UPDATE TO app_backend
USING (user_id = public.current_app_user_id())
WITH CHECK (user_id = public.current_app_user_id());

CREATE POLICY study_requests_backend_delete
ON public.study_requests FOR DELETE TO app_backend
USING (user_id = public.current_app_user_id());

-- 9. MATCHES
CREATE POLICY matches_backend_all
ON public.matches FOR ALL TO app_backend
USING (
    user1_id = public.current_app_user_id()
    OR user2_id = public.current_app_user_id()
)
WITH CHECK (
    user1_id = public.current_app_user_id()
    OR user2_id = public.current_app_user_id()
);

-- 10. SESSIONS
CREATE POLICY sessions_backend_all
ON public.sessions FOR ALL TO app_backend
USING (
    EXISTS (
        SELECT 1
        FROM public.matches m
        WHERE m.id = sessions.match_id
          AND (
              m.user1_id = public.current_app_user_id()
              OR m.user2_id = public.current_app_user_id()
          )
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1
        FROM public.matches m
        WHERE m.id = sessions.match_id
          AND (
              m.user1_id = public.current_app_user_id()
              OR m.user2_id = public.current_app_user_id()
          )
    )
);

-- 11. RESOURCES
CREATE POLICY resources_backend_all
ON public.resources FOR ALL TO app_backend
USING (
    user_id = public.current_app_user_id()
    OR (
        session_id IS NOT NULL
        AND EXISTS (
            SELECT 1
            FROM public.sessions s
            JOIN public.matches m ON m.id = s.match_id
            WHERE s.id = resources.session_id
              AND (
                  m.user1_id = public.current_app_user_id()
                  OR m.user2_id = public.current_app_user_id()
              )
        )
    )
)
WITH CHECK (
    user_id = public.current_app_user_id()
);

-- 12. RATINGS
-- Eşleştirme görünümündeki ortalama puan hesabı için SELECT erişimi korunur.
CREATE POLICY ratings_backend_select
ON public.ratings FOR SELECT TO app_backend
USING (true);

CREATE POLICY ratings_backend_insert
ON public.ratings FOR INSERT TO app_backend
WITH CHECK (reviewer_id = public.current_app_user_id());

CREATE POLICY ratings_backend_update
ON public.ratings FOR UPDATE TO app_backend
USING (reviewer_id = public.current_app_user_id())
WITH CHECK (reviewer_id = public.current_app_user_id());

CREATE POLICY ratings_backend_delete
ON public.ratings FOR DELETE TO app_backend
USING (reviewer_id = public.current_app_user_id());

-- 13. STUDY_GROUPS
CREATE POLICY study_groups_backend_all
ON public.study_groups FOR ALL TO app_backend
USING (
    created_by = public.current_app_user_id()
    OR EXISTS (
        SELECT 1
        FROM public.group_members gm
        WHERE gm.group_id = study_groups.id
          AND gm.user_id = public.current_app_user_id()
    )
)
WITH CHECK (created_by = public.current_app_user_id());

-- 14. GROUP_MEMBERS
CREATE POLICY group_members_backend_all
ON public.group_members FOR ALL TO app_backend
USING (
    user_id = public.current_app_user_id()
    OR EXISTS (
        SELECT 1
        FROM public.study_groups sg
        WHERE sg.id = group_members.group_id
          AND sg.created_by = public.current_app_user_id()
    )
)
WITH CHECK (
    user_id = public.current_app_user_id()
    OR EXISTS (
        SELECT 1
        FROM public.study_groups sg
        WHERE sg.id = group_members.group_id
          AND sg.created_by = public.current_app_user_id()
    )
);

-- 15. REPORTS
CREATE POLICY reports_backend_all
ON public.reports FOR ALL TO app_backend
USING (reporter_id = public.current_app_user_id())
WITH CHECK (reporter_id = public.current_app_user_id());

-- 16. ADMINS
CREATE POLICY admins_backend_select
ON public.admins FOR SELECT TO app_backend
USING (user_id = public.current_app_user_id());

-- 17. Matching view: temel tabloların RLS kurallarına tabi olsun.
ALTER VIEW public.active_matching_pool
SET (security_invoker = true);

GRANT SELECT ON public.active_matching_pool TO app_backend;

COMMIT;
