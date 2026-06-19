import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const session = await auth();

  // Check if accessing /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow access to /admin/login without authentication
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }

    // Protect all other /admin routes
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
