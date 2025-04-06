import { Dipendenti } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET(req: NextRequest) {
  let dipendenti: Dipendenti[] = [];
  dipendenti = await prisma.dipendenti.findMany();
  return NextResponse.json(dipendenti);
}

export async function POST(req: Request) {
  const {
    nome,
    cognome,
    email,
    telefono,
    stipendio,
    attivo,
    dataAssunzione,
    ruolo,
  } = (await req.json()) as Dipendenti;

  let dipendente: Dipendenti | null = null;

  //   const existingUser = await prisma.dipendenti.findUnique({
  //     where: { email },
  //   });
  //   if (existingUser) {
  //     return NextResponse.json({ error: "Email già in uso" }, { status: 400 });
  //   }

  try {
    dipendente = await prisma.dipendenti.create({
      data: {
        nome,
        cognome,
        email,
        telefono,
        stipendio,
        attivo,
        ruolo,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Errore durante la creazione dell'utente" },
      { status: 500 }
    );
  }

  return NextResponse.json(dipendente, { status: 201 });
}
