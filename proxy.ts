import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Next.js 16: "middleware.ts" is deprecated — use "proxy.ts" instead.
// See: https://nextjs.org/docs/messages/middleware-to-proxy

export function proxy(request: NextRequest) {
  return NextResponse.next();
}

export default proxy;

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
