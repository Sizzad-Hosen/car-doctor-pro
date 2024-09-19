import { NextResponse } from 'next/server';
import { cookies } from 'next/server';

export function middleware(request) {

  const token = request.cookies.get(
    process.env.NODE_ENV === 'production'
      ? '__Secure-next-auth.session-token'
      : 'next-auth.session-token'
  );


  console.log('Token:', token);

  const pathname = request.nextUrl.pathname;

  if (pathname.includes('/api')) {
    return NextResponse.next();
  }


  if (!token) {
    return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ['/mybookings/:path*', '/services/:path*'],
};
