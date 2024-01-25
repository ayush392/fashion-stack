import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  let cookie = request.cookies.get("nextJsAuth");
  // console.log(request.cookies);
  const pathname = request.nextUrl.pathname;
  // console.log(pathname);

  if (pathname === "/profile") {
    if (cookie) {
      return NextResponse.next();
    } else {
      return NextResponse.json({ message: "Unauthorised" }, { status: 401 });
    }
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
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
