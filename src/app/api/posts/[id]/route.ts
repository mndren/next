import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { Post } from "@prisma/client";

export async function GET(req: NextRequest, { params }) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "ID non fornito" }, { status: 400 });
  }
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
    include: { author: true },
  });

  return NextResponse.json(post);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  let author_id: number | undefined;
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "ID non fornito" }, { status: 400 });
  }
  const { title, content, published, authorId } = await req.json();
  if (authorId && typeof authorId !== "number") {
    author_id = parseInt(authorId);
  }

  const post = await prisma.post.update({
    where: { id: parseInt(id) },
    data: { title, content, published, authorId: author_id },
  });
  return NextResponse.json(post);
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "ID non fornito" }, { status: 400 });
  }

  await prisma.post.delete({
    where: { id: parseInt(id) },
  });

  return NextResponse.json({ message: "Post eliminato con successo" });
}
