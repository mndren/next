import { User } from "@prisma/client";
import { prisma } from "../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  let users: User[] = [];
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    users = await prisma.user.findMany({
      where: { id: parseInt(id) },
    });
  } else {
    users = await prisma.user.findMany();
  }
  if (!users) {
    return NextResponse.json(
      { error: "Nessun utente trovato" },
      { status: 404 }
    );
  }
  return NextResponse.json(users);
}

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "ID non fornito" }, { status: 400 });
  }
  const { name, email } = (await req.json()) as User;
  const user = await prisma.user.update({
    where: { id: parseInt(id) },
    data: { name, email },
  });

  return NextResponse.json(user);
}

export async function POST(req: Request) {
  const { name, email } = (await req.json()) as User;

  const user = await prisma.user.create({
    data: { name, email },
  });

  return NextResponse.json(user);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "ID non fornito" }, { status: 400 });
  }

  await prisma.user.delete({
    where: { id: parseInt(id) },
  });

  return NextResponse.json({ success: true });
}
