import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { Post } from "@prisma/client";

export async function GET() {
  let posts: Post[] = [];
  posts = await prisma.post.findMany({
    include: { author: true },
  });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const { title, content, authorId, published } = (await req.json()) as Post;
  if (!title || !content) {
    return NextResponse.json(
      { error: "Titolo e contenuto sono richiesti" },
      { status: 400 }
    );
  }
  const post = await prisma.post.create({
    data: { title, content, author: { connect: { id: authorId } }, published },
  });
  return NextResponse.json(post);
}
