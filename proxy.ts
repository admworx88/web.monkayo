import { type NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function proxy(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);

  // Protected routes that require authentication
  if (request.nextUrl.pathname.startsWith('/cms')) {
    if (!user) {
      // Redirect to signin if not authenticated
      const url = request.nextUrl.clone();
      url.pathname = '/signin';
      return Response.redirect(url);
    }
  }

  // Redirect authenticated users away from auth pages
  if (
    (request.nextUrl.pathname === '/signin' ||
      request.nextUrl.pathname === '/signup') &&
    user
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/cms/dashboard';
    return Response.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes (they handle their own auth)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
