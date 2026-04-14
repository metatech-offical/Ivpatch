import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Clerk middleware is disabled for now — using mock auth
// TODO: Uncomment and configure when Clerk is ready for production

export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
