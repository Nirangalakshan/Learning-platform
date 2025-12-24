import { type NextRequest, NextResponse } from "next/server"

const API_KEY = process.env.APILAGE_API_KEY
const API_URL = process.env.APILAGE_API_URL

export async function POST(request: NextRequest) {
  try {
    const { subject, lessons, isAllSyllabus, questionType, difficulty, questionCount, language } = await request.json()

    if (!subject || !questionType || !difficulty || !questionCount || !language) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    const scopeSection = isAllSyllabus
      ? `Cover all topics and lessons from the ${subject} syllabus`
      : `Focus on these specific lessons/topics: ${lessons.join(", ")}`

    const languageInstruction =
      language === "sinhala" ? "Generate the quiz in Sinhala language." : "Generate the quiz in English language."

    const prompt = `Generate ${questionCount} ${difficulty.toLowerCase()} level ${questionType.replace("-", " ")} questions for ${subject} subject (Sri Lankan A/L Science).

${languageInstruction}

Scope: ${scopeSection}

For ${questionType}:
${
  questionType === "multiple-choice"
    ? "Provide questions with 4 options (A, B, C, D) and mark the correct answer"
    : questionType === "essay"
      ? "Provide thought-provoking essay questions that require detailed explanations"
      : questionType === "short-answer"
        ? "Provide questions with concise expected answers (1-3 lines)"
        : questionType === "true-false"
          ? "Provide true/false statements with explanations"
          : questionType === "fill-blank"
            ? "Provide fill-in-the-blank questions with answers"
            : "Provide a mix of all question types mentioned above"
}

Return the response as JSON with this structure:
{
  "questions": [
    {
      "id": "unique-id",
      "text": "question text",
      "type": "${questionType}",
      "options": ["option1", "option2", ...],
      "correctAnswer": "option1"
    }
  ]
}`

    const headers = {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    }

    const payload = {
      message: prompt,
      model: "APILAGEAI-PRO",
      enableGoogleSearch: false,
    }

    const aiResponse = await fetch(API_URL as string, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    })

    if (!aiResponse.ok) {
      throw new Error(`Apilage API error: ${aiResponse.statusText}`)
    }

    const aiData = await aiResponse.json()

    let questions = []
    try {
      const responseText = aiData.message || aiData.response || JSON.stringify(aiData)
      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        questions = parsed.questions || []
      }
    } catch (parseError) {
      console.error("[v0] Failed to parse AI response:", parseError)
      questions = generateMockQuestions(subject, questionType, difficulty, questionCount)
    }

    return NextResponse.json({
      questions: questions.slice(0, questionCount),
      subject,
      questionType,
      difficulty,
      lessons,
      isAllSyllabus,
      language,
    })
  } catch (error) {
    console.error("[v0] Quiz generation error:", error)
    return NextResponse.json({ error: "Failed to generate quiz. Please try again." }, { status: 500 })
  }
}
