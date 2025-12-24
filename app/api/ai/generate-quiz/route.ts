import { type NextRequest, NextResponse } from "next/server"

const API_KEY = process.env.APILAGE_API_KEY
const API_URL = process.env.APILAGE_API_URL

export async function POST(request: NextRequest) {
  try {
    const { subject, lessons, isAllSyllabus, questionType, difficulty, questionCount } = await request.json()

    if (!subject || !questionType || !difficulty || !questionCount) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    const scopeSection = isAllSyllabus
      ? `Cover all topics and lessons from the ${subject} syllabus`
      : `Focus on these specific lessons/topics: ${lessons.join(", ")}`

    const prompt = `Generate ${questionCount} ${difficulty.toLowerCase()} level ${questionType.replace("-", " ")} questions for ${subject} subject (Sri Lankan A/L Science).

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
      // Try to extract JSON from the response
      const responseText = aiData.message || aiData.response || JSON.stringify(aiData)
      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0])
        questions = parsed.questions || []
      }
    } catch (parseError) {
      console.error("[v0] Failed to parse AI response:", parseError)
      // Return mock data if parsing fails (for testing)
      questions = generateMockQuestions(subject, questionType, difficulty, questionCount)
    }

    return NextResponse.json({
      questions: questions.slice(0, questionCount),
      subject,
      questionType,
      difficulty,
      lessons,
      isAllSyllabus,
    })
  } catch (error) {
    console.error("[v0] Quiz generation error:", error)
    return NextResponse.json({ error: "Failed to generate quiz. Please try again." }, { status: 500 })
  }
}

function generateMockQuestions(subject: string, questionType: string, difficulty: string, count: number) {
  const mockQuestions = {
    Biology: {
      "multiple-choice": [
        {
          id: "1",
          text: "Which organelle is responsible for ATP production?",
          type: "multiple-choice",
          options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi Apparatus"],
          correctAnswer: "Mitochondria",
        },
        {
          id: "2",
          text: "What is the basic unit of life?",
          type: "multiple-choice",
          options: ["Atom", "Molecule", "Cell", "Tissue"],
          correctAnswer: "Cell",
        },
      ],
    },
    Chemistry: {
      "multiple-choice": [
        {
          id: "1",
          text: "What is the pH of a neutral solution?",
          type: "multiple-choice",
          options: ["0", "7", "14", "10"],
          correctAnswer: "7",
        },
        {
          id: "2",
          text: "Which element has atomic number 6?",
          type: "multiple-choice",
          options: ["Oxygen", "Nitrogen", "Carbon", "Hydrogen"],
          correctAnswer: "Carbon",
        },
      ],
    },
    Physics: {
      "multiple-choice": [
        {
          id: "1",
          text: "What is the SI unit of force?",
          type: "multiple-choice",
          options: ["Pascal", "Newton", "Joule", "Watt"],
          correctAnswer: "Newton",
        },
        {
          id: "2",
          text: "Which law states F = ma?",
          type: "multiple-choice",
          options: ["First Law", "Second Law", "Third Law", "Fourth Law"],
          correctAnswer: "Second Law",
        },
      ],
    },
  }

  return mockQuestions[subject as keyof typeof mockQuestions]?.[questionType as keyof any]?.slice(0, count) || []
}
