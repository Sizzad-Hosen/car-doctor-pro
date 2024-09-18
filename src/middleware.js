import { NextResponse } from 'next/server'
import {cookies}  from 'next/server'
export function middleware(request) {
  const token = request.cookies.get('_Secure-next-auth.session-token');
 const pathname = request.nextUrl.pathname;
 if(pathname.includes('/api'))
 {
    return NextResponse.next();

 }
  if (!token) {
    return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher:[ '/mybookings/:path*', '/services/:path*' ]

}
