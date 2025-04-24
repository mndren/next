import OpenAI from "openai";

const OPEN_AI_KEY = process.env.OPENAI_API_KEY;

if (!OPEN_AI_KEY) {
  console.warn(
    "Attenzione: OPENAI_API_KEY non è impostata nelle variabili d'ambiente"
  );
}

const openai = new OpenAI({
  apiKey: OPEN_AI_KEY,
});

export async function chat(prompt: string): Promise<string | null> {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Sei un esperto in generazione di mansioni per un'azienda dato il ruolo",
      },
      { role: "user", content: prompt },
    ],
    store: true,
  });
  return completion.choices[0].message.content;
}

export default openai;
