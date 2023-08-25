import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const originId = url.searchParams.get('originId')
  const destinationId = url.searchParams.get('destinationId')
  const response = await fetch(`http://host.docker.internal:3000/directions?originId=${originId}&destinationID=${destinationId}`, {
    next: {
      revalidate: 60 // prod aumentar o cache
    }
  })
  return NextResponse.json(await response.json());
}