// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { isMobileApp } from '@/lib/mobile-app-detection'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Check if request is from mobile app
  const isFromMobileApp = isMobileApp(request.headers);
  
  // Set mobile app detection cookie
  if (isFromMobileApp) {
    response.cookies.set('is-mobile-app', 'true', {
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    })
  } else {
    // Clear the cookie if not from mobile app
    response.cookies.delete('is-mobile-app')
  }

  // Handle currency cookie
  const currencyCookie = request.cookies.get('currency')
  if (!currencyCookie) {
    const data = JSON.stringify({
      label: "₹ INR - Indian Rupee",
      symbol: "₹",
      currency: "INR",
      iso: "en-IN",
      flag: "IN",
      style: "currency",
      currencyDisplay: "symbol",
      maximumFractionDigits: 2,
    })

    response.cookies.set('currency', data, {
      path: '/',
      maxAge: 60 * 60 * 24 * 3650, // 10 years
    })
  }

  return response
}

export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
