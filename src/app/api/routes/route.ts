import { revalidateTag } from "next/cache";
import {  NextResponse } from "next/server";


export async function GET() {
  const response = await fetch(`${process.env.NEST_URL}/routes`, {
    next: {
      revalidate: 1 ,// prod aumentar o cache
      tags: ["routes"]
    }
  })
  return NextResponse.json(await response.json());
}


export async function POST(reuest: Request) {
  const response = await fetch(`${process.env.NEST_URL}/routes`, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(await reuest.json())
  })
  revalidateTag("routes")
  return NextResponse.json(await response.json());
}