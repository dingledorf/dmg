// /middleware.ts
import { NextRequest, NextResponse } from "next/server";

export const middleware = async( request: NextRequest ) => {
  const loggedIn = request.cookies.get('jwt');
  const pathname = request.nextUrl.pathname;
  if ( pathname != "/login" && !loggedIn ){
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher : '/((?!login|_next/static|_next/image|favicon.ico).*)'
}