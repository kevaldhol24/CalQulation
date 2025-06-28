// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const currencyCookie = request.cookies.get('currency')
  if (!currencyCookie) {
    const response = NextResponse.next()

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

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
