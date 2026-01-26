import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt, system, apiKey } = await req.json();
  if (!prompt || !system) {
    return NextResponse.json({ error: "Missing prompt or system instruction." }, { status: 400 });
  }

  const key = apiKey || process.env.OPENAI_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "No OpenAI API key provided." }, { status: 401 });
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt },
      ],
      max_tokens: 1024,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    return NextResponse.json({ error: data.error?.message || "OpenAI error" }, { status: 500 });
  }

  return NextResponse.json({ result: data.choices?.[0]?.message?.content || "" });
}
