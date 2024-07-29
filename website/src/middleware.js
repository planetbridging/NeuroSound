import { NextResponse } from "next/server";
import { getTokenFromCookies } from "./app/getTokenFromCookies.js";
import { checkAuth } from "./app/checkAuth.js";

export async function middleware(req) {
  const token = getTokenFromCookies(req);
  const loggedInUser = await checkAuth(token);

  const response = NextResponse.next();

  if (loggedInUser) {
    response.cookies.set("loggedInUser", loggedInUser);
  } else {
    response.cookies.delete("loggedInUser");
  }

  return response;
}

export const config = {
  matcher: ["/"],
};
