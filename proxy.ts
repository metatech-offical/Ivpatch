import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Next.js 16: "middleware.ts" is deprecated — use "proxy.ts" instead.
// See: https://nextjs.org/docs/messages/middleware-to-proxy

export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
