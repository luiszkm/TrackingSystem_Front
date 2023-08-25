

import {  NextResponse, NextRequest } from "next/server";


export async function GET(req: NextRequest,
  {params}: { params: { routeId: string } }) {
    const id = params.routeId;

  const response = await fetch(`http://host.docker.internal:3000/routes/${id}`, {
    next: {
      revalidate: 60 ,// prod aumentar o cache
    }
  })
  return NextResponse.json(await response.json());
}