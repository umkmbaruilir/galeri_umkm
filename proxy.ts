import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token =
    request.cookies.get("token");

  const path =
    request.nextUrl.pathname;

  const isProtected =
    path.startsWith("/admin/dashboard") ||
    path.startsWith("/admin/umkm");

  const isLoginPage =
    path === "/admin/login";

  if (isProtected && !token) {
    return NextResponse.redirect(
      new URL(
        "/admin/login",
        request.url
      )
    );
  }

  if (isLoginPage && token) {
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