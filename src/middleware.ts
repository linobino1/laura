import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import acceptLanguage from 'accept-language'
import { i18n } from '../i18n'

const { cookieName, fallbackLng, supportedLngs } = i18n

acceptLanguage.languages(supportedLngs)

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  // return NextResponse.redirect(new URL('/home', request.url))
  let lng
  if (req.cookies.has(cookieName)) lng = acceptLanguage.get(req.cookies.get(cookieName)?.value)
  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'))
  if (!lng) lng = fallbackLng

  // Redirect if lng in path is not supported
  if (
    !supportedLngs.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url))
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer') ?? '')
    const lngInReferer = supportedLngs.find((l) => refererUrl.pathname.startsWith(`/${l}`))
    const response = NextResponse.next()
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|admin|_next/static|_next/image|assets|favicon.ico|favicon.png|sw.js|site.webmanifest).*)',
  ],
}
