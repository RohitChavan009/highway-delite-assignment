import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  const credentials = request.cookies.get("tokens");

  const response = NextResponse.next();

  if (!credentials) {
    return NextResponse.redirect(new URL("/sign-up", request.url));
  }

  return response;
};

// See "Matching Paths" below
export const config = {
  matcher: ["/((?!sign-up|sign-in|api|_next|static|favicon.ico).*)"],
};
