import { NextResponse } from "next/server";

export async function GET() {
  console.log("Healthz");
  
  return NextResponse.json("Healthz");
}
