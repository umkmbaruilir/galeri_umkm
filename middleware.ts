import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

export function middleware(
  request: NextRequest
) {
  const token =
    request.cookies.get("token");

  const path =
    request.nextUrl.pathname;

  const isLoginPage =
    path === "/admin/login";

  const isProtected =
    path.startsWith("/admin/dashboard") ||
    path.startsWith("/admin/umkm");

  const isAuthenticated =
    token &&
    verifyToken(token.value);

  if (
    isProtected &&
    !isAuthenticated
  ) {
    return NextResponse.redirect(
      new URL(
        "/admin/login",
        request.url
      )
    );
  }

  if (
    isLoginPage &&
    isAuthenticated
  ) {
    return NextResponse.redirect(
      new URL(
        "/admin/dashboard",
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};