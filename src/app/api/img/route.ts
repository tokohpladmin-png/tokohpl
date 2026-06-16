import { NextRequest, NextResponse } from 'next/server';

// Proxy Cloudinary images to bypass host_not_allowed restriction
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const src = searchParams.get('src');

  if (!src) {
    return new NextResponse('Missing src', { status: 400 });
  }

  // Only allow our Cloudinary account
  if (!src.startsWith('https://res.cloudinary.com/varindo/')) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  try {
    const upstream = await fetch(src, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Referer': 'https://tokohpl.com/',
      },
      next: { revalidate: 86400 }, // cache 24h
    });

    if (!upstream.ok) {
      return new NextResponse(null, { status: upstream.status });
    }

    const body = await upstream.arrayBuffer();
    const contentType = upstream.headers.get('content-type') || 'image/webp';

    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      },
    });
  } catch {
    return new NextResponse('Error fetching image', { status: 502 });
  }
}
