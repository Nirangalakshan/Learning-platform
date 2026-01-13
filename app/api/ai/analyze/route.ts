import { type NextRequest, NextResponse } from "next/server";

// Polyfill for DOMMatrix which is missing in Node.js but required by some pdf.js versions used by pdf-parse
if (typeof global.DOMMatrix === "undefined") {
  // @ts-ignore
  global.DOMMatrix = class DOMMatrix {
    constructor() {
      return {
        a: 1,
        b: 0,
        c: 0,
        d: 1,
        e: 0,
        f: 0,
        m11: 1,
        m12: 0,
        m13: 0,
        m14: 0,
        m21: 0,
        m22: 1,
        m23: 0,
        m24: 0,
        m31: 0,
        m32: 0,
        m33: 1,
        m34: 0,
        m41: 0,
        m42: 0,
        m43: 0,
        m44: 1,
      };
    }
  };
}

const pdf = require("pdf-parse");

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const message = formData.get("message") as string;
    const mode = formData.get("mode") as string;

    const apiKey = process.env.APILAGE_API_KEY;
    const apiUrl = process.env.APILAGE_API_URL;

    if (!apiKey || !apiUrl) {
      return NextResponse.json(
        { error: "Apilage AI credentials not configured" },
        { status: 500 }
      );
    }

    let fileContent = "";
    if (file) {
      if (file.type === "application/pdf") {
        try {
          const buffer = Buffer.from(await file.arrayBuffer());
          const data = await pdf(buffer);
          fileContent = data.text;
        } catch (pdfError) {
          console.error("PDF Parsing Error:", pdfError);
          fileContent = `(Error parsing PDF: ${file.name})`;
        }
      } else if (file.type.startsWith("text/")) {
        fileContent = await file.text();
      } else if (file.type.startsWith("image/")) {
        fileContent = `(User uploaded an image: ${file.name}. Please note that I can currently only "see" the filename and some metadata. If you need me to analyze the visual content, please describe it or upload the text version.)`;
      }
    }

    const prompt = `You are an expert AI educational assistant for A/L students in Sri Lanka. 

${
  fileContent
    ? `CONTEXT FROM UPLOADED FILE (${
        file?.name
      }):\n--- START OF FILE CONTENT ---\n${fileContent.substring(
        0,
        15000
      )}\n--- END OF FILE CONTENT ---\n\n`
    : ""
}
USER MESSAGE: ${message}
ANALYSIS MODE: ${mode}

INSTRUCTIONS:
1. Always provide accurate and high-quality educational content.
2. If the mode is "quiz", generate a well-structured quiz (MCQs or structured) based on the context or user topic.
3. If the mode is "notes", generate detailed, organized revision notes with bullet points and headings.
4. If the mode is "chat", simply answer the user's question based on the provided context or your general knowledge.
5. Use professional and encouraging language. If the user asks in Sinhala, respond in Sinhala.
6. Format your response exactly as requested by the mode (e.g., Markdown for notes).`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: prompt,
        model: "APILAGEAI-FREE",
        enableGoogleSearch: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Apilage AI API error: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      data: {
        response:
          data.message ||
          data.response ||
          "No response received from AI assistant.",
      },
    });
  } catch (error: any) {
    console.error("AI Analysis Error:", error);
    return NextResponse.json(
      { error: "Failed to analyze: " + (error.message || "Unknown error") },
      { status: 500 }
    );
  }
}
