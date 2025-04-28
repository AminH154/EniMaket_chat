const host = "http://localhost:5000";
export const LoginRoutes = `${host}/api/auth/`;
export const RegisterRoutes = `${host}/api/auth/register`;
export const updateProfileRoutes = `${host}/api/auth/profile-update`;
export const fetchUser = (userId) => `${host}/api/auth/Home/${userId}`;
export const fetchUsers =`${host}/api/auth/Home`;