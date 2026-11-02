-- 1. Custom backend user context function
CREATE OR REPLACE FUNCTION public.current_app_user_id()
RETURNS UUID
LANGUAGE SQL
STABLE
AS $$
SELECT NULLIF(current_setting('app.user_id', true), '')::UUID;
$$;

-- 2. Remove previous policies
DROP POLICY IF EXISTS "Kullanıcılar yalnızca kendi profillerini güncelleyebilir" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Sadece aktif talepler görüntülenebilir" ON public.study_requests;
DROP POLICY IF EXISTS "Users can view active study requests" ON public.study_requests;

-- 3. Users RLS policy
CREATE POLICY "Users can update their own profile"
ON public.users
FOR UPDATE
TO app_backend
USING (id = (SELECT public.current_app_user_id()))
WITH CHECK (id = (SELECT public.current_app_user_id()));

-- 4. Study requests RLS policies
CREATE POLICY "Users can view active study requests"
ON public.study_requests
FOR SELECT
TO app_backend
USING (is_active = TRUE);

CREATE POLICY "Users can create their own study requests"
ON public.study_requests
FOR INSERT
TO app_backend
WITH CHECK (user_id = (SELECT public.current_app_user_id()));

-- 5. Restrict active_matching_pool access
REVOKE ALL PRIVILEGES
ON public.active_matching_pool
FROM anon, authenticated;

GRANT SELECT
ON public.active_matching_pool
TO app_backend;

-- 6. Revoke direct table access
REVOKE ALL PRIVILEGES ON TABLE
public.admins,
public.courses,
public.group_members,
public.matches,
public.ratings,
public.reports,
public.resources,
public.sessions,
public.study_groups,
public.study_requests,
public.user_courses,
public.users
FROM anon, authenticated;

-- 7. Enable RLS on all application tables
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_courses ENABLE ROW LEVEL SECURITY;
