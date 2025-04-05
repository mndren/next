import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
import { Post } from "@prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  if (!id) {
    return NextResponse.json({ error: "ID non fornito" }, { status: 400 });
  }
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
    include: { author: true },
  });
  if (!post) {
    return NextResponse.json({ error: "Post non trovato" }, { status: 404 });
  }
  return NextResponse.json(post);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "ID non fornito" }, { status: 400 });
  }
  const { title, content, published } = (await req.json()) as Post;
  const post = await prisma.post.update({
    where: { id: parseInt(id) },
    data: { title, content, published },
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
