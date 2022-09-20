import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req: any) {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_JWT_SECRET,
    secureCookie: process.env.NODE_ENV === 'production',
  });

  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) return NextResponse.redirect(new URL('/signin', req.url));
  }

  if (req.nextUrl.pathname === '/profile') {
    if (session) return NextResponse.redirect(new URL(`/profile/${session.displayName}`, req.url));
  }

  if (req.nextUrl.pathname.startsWith('/profile')) {
    if (!session) return NextResponse.redirect(new URL('/signin', req.url));
  }

  if (req.nextUrl.pathname.startsWith('/signin') || req.nextUrl.pathname.startsWith('/signup')) {
    if (session) return NextResponse.redirect(new URL('/dashboard', req.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*', '/signin', '/signup/:path*', '/profile/:path*'],
};
