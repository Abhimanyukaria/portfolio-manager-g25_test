// the handleAuth function will handle the authentication for us
// it provides us with various routes 
// such as login, logout, callback, and me
// we can use these routes to authenticate the user

// /api/auth/login opens th auth0 form for loggin in
// /api/auth/logout logs the user out
// /api/auth/callback is the callback route
// /api/auth/me returns the user data



import { handleAuth } from '@auth0/nextjs-auth0';

export const GET = handleAuth();