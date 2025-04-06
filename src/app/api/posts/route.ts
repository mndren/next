import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { Post } from "@prisma/client";

export async function GET() {
  let posts: Post[] = [];
  try {
    posts = await prisma.post.findMany({
      include: { author: true },
    });
  } catch (error) {
    console.error("Errore durante il recupero dei post:", error);
    return NextResponse.json(
      { error: "Errore durante il recupero dei post" },
      { status: 500 }
    );
  }
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  let post: Post | null = null;
  const { title, content, authorId, published } = (await req.json()) as Post;
  if (!title || !content) {
    return NextResponse.json(
      { error: "Titolo e contenuto sono richiesti" },
      { status: 400 }
    );
  }
  try {
    post = await prisma.post.create({
      data: {
        title,
        content,
        author: { connect: { id: authorId } },
        published,
      },
    });
  } catch (error) {
    console.error("Errore durante la creazione del post:", error);
    return NextResponse.json(
      { error: "Errore durante la creazione del post" },
      { status: 500 }
    );
  }
  return NextResponse.json(post);
}
