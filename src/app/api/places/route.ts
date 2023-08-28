import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const text = url.searchParams.get("text")
  const response = await fetch(`${process.env.NEST_URL}/places?text=${text}`, {
    next: {
      revalidate: 60 // prod aumentar o cache
    }
  })
  return NextResponse.json(await response.json());
}