import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET() {
  const count = await prisma.post.count();
  return new NextResponse(JSON.stringify({ count }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
