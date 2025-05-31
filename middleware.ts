import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequestWithAuth } from 'next-auth/middleware';

export default async function middleware(request: NextRequestWithAuth) {
  const token = await getToken({ req: request });
  const isAdminRoute = request.nextUrl.pathname.startsWith('/blog/admin');
  const isLoginPage = request.nextUrl.pathname === '/login';

  // If trying to access admin route without being logged in
  if (isAdminRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If trying to access admin route without admin role
  if (isAdminRoute && token?.role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If logged in user tries to access login page
  if (isLoginPage && token) {
    return NextResponse.redirect(new URL('/blog/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/blog/admin/:path*', '/login']
}; 