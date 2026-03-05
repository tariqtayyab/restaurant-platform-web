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

  // Remove port if present
  const hostWithoutPort = hostname.split(':')[0]
  const parts = hostWithoutPort.split('.')
  
  console.log('Host without port:', hostWithoutPort)
  console.log('Parts:', parts)

  let subdomain = ''

  // Handle production domain (yourease.shop)
  if (hostWithoutPort.includes('yourease.shop')) {
    // If there are 3+ parts, first part is subdomain
    // e.g., chillout.yourease.shop -> ['chillout', 'yourease', 'shop']
    if (parts.length >= 3) {
      subdomain = parts[0]
    }
  }
  // Handle localhost
  else if (hostWithoutPort === 'localhost') {
    subdomain = ''
  }
  // Handle IP addresses
  else if (/^\d+\.\d+\.\d+\.\d+$/.test(hostWithoutPort)) {
    subdomain = ''
  }

  console.log('Extracted subdomain:', subdomain || '(none - root domain)')

  // Don't rewrite for root domain, API routes, or static files
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
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}