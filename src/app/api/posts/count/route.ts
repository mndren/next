import { prisma } from "../../../../../lib/prisma";

export async function GET() {
  const count = await prisma.post.count();
  return new Response(JSON.stringify({ count }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
