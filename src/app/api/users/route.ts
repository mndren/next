import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user) {
    return NextResponse.json({ error: "Utente non trovato" }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { name, email } = await req.json();

  const user = await prisma.user.update({
    where: { id: parseInt(params.id) },
    data: { name, email },
  });

  return NextResponse.json(user);
}

export async function POST(req: Request) {
  const { name, email } = await req.json();

  const user = await prisma.user.create({
    data: { name, email },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.user.delete({
    where: { id: parseInt(params.id) },
  });

  return NextResponse.json({ success: true });
}
