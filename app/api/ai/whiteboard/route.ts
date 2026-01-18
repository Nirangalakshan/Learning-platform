import { type NextRequest, NextResponse } from "next/server";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

// Vision-capable models available on OpenRouter
const VISION_MODEL = "google/gemini-2.0-flash-exp:free"; // Fast and supports vision

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      canvasImage,
      textAnswer,
      question,
      subject,
      topic,
      mode,
      answerMode,
    } = body;

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "OpenRouter API key not configured. Please add OPENROUTER_API_KEY to your environment variables.",
        },
        { status: 500 },
      );
    }

    // Build the analysis prompt based on mode
    let analysisPrompt = "";

    if (mode === "check") {
      analysisPrompt = `You are an expert educational AI tutor helping A/L students in Sri Lanka.

CONTEXT:
- Subject: ${subject || "General"}
- Topic: ${topic || "Not specified"}
- Question/Problem: ${question}

The student has provided their answer. Carefully analyze the content and provide:

1. **Student's Answer**: What did the student write? (State their answer clearly)
2. **Assessment**: Is the answer correct, partially correct, or incorrect?
3. **Detailed Feedback**: 
   - If correct: Congratulate and explain why it's right
   - If partially correct: Point out what's right and what needs improvement
   - If incorrect: Explain the mistake gently and guide them to the right answer
4. **Next Steps**: What should the student focus on next?

IMPORTANT:
- Be encouraging and supportive
- Use clear, simple language
- If it's a whiteboard image, try your best to interpret the handwriting
- Provide step-by-step guidance if the answer is wrong
- Format your response with proper markdown`;
    } else if (mode === "hint") {
      analysisPrompt = `You are an expert educational AI tutor helping A/L students in Sri Lanka.

CONTEXT:
- Subject: ${subject || "General"}
- Topic: ${topic || "Not specified"}  
- Question/Problem: ${question}

The student is working on this problem and needs a hint. Look at their current progress on the whiteboard image and provide:

1. **Current Progress**: Briefly describe what you see they've written/drawn so far
2. **Helpful Hint**: Give a useful hint WITHOUT giving away the full answer
3. **Guiding Question**: Ask a question that helps them think in the right direction

IMPORTANT:
- Don't solve the problem for them
- Encourage independent thinking
- Be supportive and motivating
- If the whiteboard is empty, provide a starting hint for the problem`;
    } else if (mode === "explain") {
      analysisPrompt = `You are an expert educational AI tutor helping A/L students in Sri Lanka.

CONTEXT:
- Subject: ${subject || "General"}
- Topic: ${topic || "Not specified"}
- Question/Problem: ${question}

Provide a complete, step-by-step solution to this problem:

1. **Understanding the Problem**: Break down what's being asked
2. **Key Concepts**: List the relevant formulas, theorems, or concepts needed
3. **Step-by-Step Solution**: Show each step clearly with explanations
4. **Final Answer**: State the final answer clearly
5. **Common Mistakes**: Mention common mistakes students make with this type of problem

If there's content on the whiteboard, also compare your solution with what the student attempted.

Format your response with proper markdown. Use LaTeX notation for any mathematical expressions (wrap in $ for inline or $$ for block).`;
    }

    // Build the message content with image if available
    const messageContent: Array<{
      type: string;
      text?: string;
      image_url?: { url: string };
    }> = [];

    // Add the text prompt
    messageContent.push({
      type: "text",
      text: analysisPrompt,
    });

    // Add the whiteboard image or text answer if available
    if (mode === "check") {
      if (answerMode === "text" && textAnswer) {
        // Text-based answer
        messageContent.push({
          type: "text",
          text: `\n\n**STUDENT'S TYPED ANSWER:**\n${textAnswer}`,
        });
      } else if (canvasImage) {
        // Whiteboard image answer
        messageContent.push({
          type: "image_url",
          image_url: {
            url: canvasImage, // Should be in format: data:image/png;base64,...
          },
        });
      } else {
        messageContent.push({
          type: "text",
          text: "\n\n[Note: No answer was provided. Please write your answer on the whiteboard or type it in the text box first.]",
        });
      }
    }

    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer":
          process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
        "X-Title": "Learning Platform - Whiteboard Analysis",
      },
      body: JSON.stringify({
        model: VISION_MODEL,
        messages: [
          {
            role: "user",
            content: messageContent,
          },
        ],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("OpenRouter API Error:", errorData);
      throw new Error(
        errorData.error?.message ||
          `OpenRouter API error: ${response.statusText}`,
      );
    }

    const data = await response.json();

    const aiResponse = data.choices?.[0]?.message?.content;

    if (!aiResponse) {
      throw new Error("No response received from AI");
    }

    return NextResponse.json({
      success: true,
      data: {
        response: aiResponse,
        mode,
        model: VISION_MODEL,
      },
    });
  } catch (error: any) {
    console.error("Whiteboard Analysis Error:", error);
    return NextResponse.json(
      { error: "Failed to analyze: " + (error.message || "Unknown error") },
      { status: 500 },
    );
  }
}
