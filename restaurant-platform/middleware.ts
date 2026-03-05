// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host') || ''
  const path = url.pathname

  console.log('=== MIDDLEWARE DEBUG ===')
  console.log('Hostname:', hostname)
  console.log('Path:', path)

  // Remove port number for consistent handling
  const hostWithoutPort = hostname.split(':')[0]
  const parts = hostWithoutPort.split('.')
  
  console.log('Host without port:', hostWithoutPort)
  console.log('Parts:', parts)

  let subdomain = ''

  // Handle localhost
  if (hostWithoutPort === 'localhost') {
    subdomain = '' // No subdomain for localhost
  }
  // Handle IP addresses (like 192.168.20.221)
  else if (/^\d+\.\d+\.\d+\.\d+$/.test(hostWithoutPort)) {
    subdomain = '' // No subdomain for IP addresses
  }
  // Handle subdomain.yourease.shop (3+ parts)
  else if (parts.length > 2) {
    subdomain = parts[0]
  }
  // Handle yourease.shop (2 parts)
  else {
    subdomain = ''
  }

  console.log('Extracted subdomain:', subdomain || '(none - root domain)')

  // Don't rewrite for:
  // - Root domain (no subdomain)
  // - www subdomain
  // - API routes
  // - Static files
  const isRootDomain = !subdomain || subdomain === 'www'
  const isApiRoute = path.startsWith('/api')
  const isStaticFile = path.includes('.') || path.startsWith('/_next')

  if (isRootDomain || isApiRoute || isStaticFile) {
    console.log('Serving normally (no rewrite)')
    return NextResponse.next()
  }

  // Rewrite subdomain requests to the [subdomain] route
  console.log(`Rewriting to: /${subdomain}${path}`)
  url.pathname = `/${subdomain}${path}`
  return NextResponse.rewrite(url)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (common files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}