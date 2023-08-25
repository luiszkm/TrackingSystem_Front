import { revalidateTag } from "next/cache";
import {  NextResponse } from "next/server";


export async function GET() {
  const response = await fetch(`http://host.docker.internal:3000/routes`, {
    next: {
    //  revalidate: 60 ,// prod aumentar o cache
      tags: ["routes"]
    }
  })
  return NextResponse.json(await response.json());
}


export async function POST(reuest: Request) {
  const response = await fetch(`http://host.docker.internal:3000/routes`, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(await reuest.json())
  })
  revalidateTag("routes")
  return NextResponse.json(await response.json());
}