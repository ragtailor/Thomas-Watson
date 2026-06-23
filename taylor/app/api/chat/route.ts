import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const MODEL_BY_KEY: Record<string, string> = {
  fast: "gemini-2.5-flash",
  pro: "gemini-2.5-pro",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    const modelKey = typeof body?.modelKey === "string" ? body.modelKey : "fast";

    if (!message) {
      return NextResponse.json({ error: "메시지가 비어 있습니다." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API 키가 설정되지 않았습니다." }, { status: 500 });
    }

    const modelName = MODEL_BY_KEY[modelKey] ?? MODEL_BY_KEY.fast;
    const ai = new GoogleGenerativeAI(apiKey);
    const model = ai.getGenerativeModel({ model: modelName });

    const result = await model.generateContent(message);
    const reply = result.response.text().trim();

    if (!reply) {
      return NextResponse.json({ error: "빈 응답을 받았습니다." }, { status: 502 });
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "서버 오류가 발생했습니다." }, { status: 500 });
  }
}
