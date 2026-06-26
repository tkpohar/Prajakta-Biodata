import { NextResponse } from 'next/server'

// Basic auth for the entire site. Set env var BIODATA_BASIC to 'user:pass'
export function middleware(req) {
  const authHeader = req.headers.get('authorization') || ''
  const creds = process.env.BIODATA_BASIC || 'prajakta:changeme'
  const expected = 'Basic ' + Buffer.from(creds).toString('base64')

  if (authHeader === expected) return NextResponse.next()

  return new Response('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Protected"' },
  })
}

export const config = { matcher: '/:path*' }
