import { NextRequest, NextResponse } from "next/server";
import { chat } from "../../../../lib/openai";

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();
  if (!prompt) {
    return NextResponse.json(
      { error: "Il prompt è obbligatorio" },
      { status: 400 }
    );
  }

  try {
    const response = await chat(prompt);

    return NextResponse.json({ response });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Errore durante la generazione della risposta" },
      { status: 500 }
    );
  }
}
