import { type NextRequest, NextResponse } from "next/server";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "google/gemini-2.0-flash-exp:free"; // Fast model for text generation

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subject, topic, difficulty = "medium" } = body;

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenRouter API key not configured" },
        { status: 500 },
      );
    }

    const prompt = `You are an expert exam question generator for A/L students in Sri Lanka.
    
    Generate a single ${difficulty} level practice question/problem for:
    - Subject: ${subject}
    - Topic: ${topic || "Any key topic in this subject"}
    
    REQUIREMENTS:
    1. The question must be academic, challenging, and suitable for A/L level.
    2. Provide ONLY the question text. Do not provide the answer or explanation.
    3. Ensure clear, standard academic English.
    4. If the subject involves math/science, include specific numbers/values to solve.
    5. Do not prefix with "Question:" or similar labels. Just the question content.
    
    Generate the question now:`;

    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer":
          process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        "X-Title": "Learning Platform - Question Generation",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`AI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const generatedQuestion = data.choices?.[0]?.message?.content?.trim();

    if (!generatedQuestion) {
      throw new Error("No question generated");
    }

    return NextResponse.json({
      success: true,
      question: generatedQuestion,
    });
  } catch (error: any) {
    console.error("Question Generation Error:", error);
    return NextResponse.json(
      { error: "Failed to generate question" },
      { status: 500 },
    );
  }
}
