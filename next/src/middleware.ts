import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "./lib/dal";

// 1. Specify protected
const protectedRoutes = ["/posts", "/categories"];
const publicRoutes = ["/login", "/signup", "/"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoutes = publicRoutes.includes(path);

  // 3. Check if token is valid
  const isValid = await verifySession();

  // 4. Redirect
  if (isProtectedRoute && !isValid) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoutes && isValid && !req.nextUrl.pathname.startsWith("/posts")) {
    return NextResponse.redirect(new URL("/posts", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
