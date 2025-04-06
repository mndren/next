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
  let user: User | null = null;
  if (!name || !email) {
    return NextResponse.json(
      { error: "Nome o email non forniti" },
      { status: 400 }
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    return NextResponse.json({ error: "Email già in uso" }, { status: 400 });
  }

  try {
    user = await prisma.user.create({
      data: { name, email },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Errore durante la creazione dell'utente" },
      { status: 500 }
    );
  }

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
