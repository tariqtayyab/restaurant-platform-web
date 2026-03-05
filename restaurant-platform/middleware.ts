// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host') || ''
  
  // Extract subdomain (e.g., "chillout" from "chillout.mycompany.com:3000")
  const subdomain = hostname.split('.')[0]
  
  // Skip for www, main domain, or localhost
  const isMainDomain = subdomain === 'www' || 
                       subdomain === 'mycompany' || 
                       hostname.includes('localhost') && subdomain === 'localhost'
  
  if (!isMainDomain) {
    // Rewrite the URL to include the subdomain in the path
    // This preserves the subdomain concept while using Next.js routing
    url.pathname = `/${subdomain}${url.pathname}`
    return NextResponse.rewrite(url)
  }
  
  return NextResponse.next()
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}