import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const dipendente = await prisma.dipendenti.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (!dipendente) {
    return NextResponse.json(
      { error: "Dipendente non trovato" },
      { status: 404 }
    );
  }

  return NextResponse.json(dipendente);
}
