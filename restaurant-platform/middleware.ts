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
  let isProduction = false

  // --- Production Domain Logic (e.g., yourease.shop) ---
  if (hostWithoutPort.includes('yourease.shop')) {
    isProduction = true
    // If there are 3+ parts, the first part is the subdomain
    if (parts.length >= 3) {
      subdomain = parts[0] // 'chillout' from chillout.yourease.shop
      console.log('🟢 Production subdomain detected:', subdomain)
    }
  } 
  // --- Local Development Logic (localhost) ---
  else if (hostWithoutPort === 'localhost') {
    // In development, we expect the subdomain to be the first part of the path
    // e.g., localhost:3000/chillout/search
    const pathParts = path.split('/').filter(Boolean)
    if (pathParts.length > 0) {
      const possibleSubdomain = pathParts[0]
      // Don't treat common paths as subdomains
      if (!['api', '_next', 'favicon.ico'].includes(possibleSubdomain)) {
        subdomain = possibleSubdomain
        console.log('🟢 Local subdomain detected from path:', subdomain)
        // For local dev, we need to rewrite the path by removing the subdomain part
        const newPath = '/' + pathParts.slice(1).join('/')
        url.pathname = newPath
        console.log(`🔄 Local rewrite: /${subdomain}${newPath === '/' ? '' : newPath} → ${newPath}`)
        return NextResponse.rewrite(url)
      }
    }
  }

  // --- Skip rewriting for API routes and static files ---
  if (path.startsWith('/api') || path.includes('.') || path.startsWith('/_next')) {
    console.log('⏩ Skipping rewrite for static/API path')
    return NextResponse.next()
  }

  // --- Production Rewrite Logic ---
  if (isProduction && subdomain) {
    // IMPORTANT: Check if the path already starts with the subdomain (which would be wrong)
    // This prevents /chillout/chillout/search
    if (path.startsWith(`/${subdomain}`)) {
        // If it does, we need to remove that initial part to avoid duplication
        const pathWithoutSubdomain = path.replace(`/${subdomain}`, '')
        url.pathname = pathWithoutSubdomain || '/'
        console.log(`🔄 Production rewrite (fixing duplication): → ${url.pathname}`)
        return NextResponse.rewrite(url)
    } else {
        // For a correct request like /search, we rewrite it to /chillout/search
        // so that Next.js finds the page in app/[subdomain]/search/page.tsx
        url.pathname = `/${subdomain}${path}`
        console.log(`🔄 Production rewrite: → ${url.pathname}`)
        return NextResponse.rewrite(url)
    }
  }

  console.log('✅ No rewrite needed, serving normally')
  return NextResponse.next()
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