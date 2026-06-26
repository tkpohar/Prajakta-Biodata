// Secret-token access for the entire site. Set env var BIODATA_ACCESS_TOKEN.
export default async function middleware(req) {
  const url = new URL(req.url)
  const token = url.searchParams.get('access_token')
  const expected = process.env.BIODATA_ACCESS_TOKEN || 'prajaktabiodata'

  if (token === expected) {
    return fetch(req)
  }

  return new Response('Unauthorized', {
    status: 401,
    headers: { 'Content-Type': 'text/plain' },
  })
}
