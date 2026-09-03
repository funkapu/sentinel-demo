import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function summarize(note) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Summarize the note in one sentence." },
      { role: "user", content: note.body },
    ],
  });
  return completion.choices[0].message.content;
}
