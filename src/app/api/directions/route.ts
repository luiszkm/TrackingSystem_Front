import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const originId = url.searchParams.get('originId')
  const destinationId = url.searchParams.get('destinationId')
  const response = await fetch(`${process.env.NEST_URL}/directions?originId=${originId}&destinationId=${destinationId}`, {
    next: {
      revalidate: 1 // prod aumentar o cache
    }
  })
  return NextResponse.json(await response.json());
}