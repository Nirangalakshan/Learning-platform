import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message, type } = await request.json()

    const apiKey = process.env.APILAGE_API_KEY
    const apiUrl = process.env.APILAGE_API_URL

    if (!apiKey || !apiUrl) {
      return NextResponse.json({ error: "Apilage AI credentials not configured" }, { status: 500 })
    }

    const headers = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    }

    const payload = {
      message,
      model: "APILAGEAI-PRO",
      enableGoogleSearch: true,
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`Apilage AI API error: ${response.statusText}`)
    }

    const data = await response.json()

    return NextResponse.json({
      success: true,
      type,
      data,
    })
  } catch (error) {
    console.error("AI Generation Error:", error)
    return NextResponse.json({ error: "Failed to generate AI content" }, { status: 500 })
  }
}
