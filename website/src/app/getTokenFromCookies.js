import cookie from "cookie";

export function getTokenFromCookies(req) {
  if (!req.headers.cookie) return null;
  const cookies = cookie.parse(req.headers.cookie);
  return cookies.token || null;
}
