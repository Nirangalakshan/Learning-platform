/**
 * Apilage AI Client Utility
 * Handles communication with Apilage AI API
 */

interface ApilageRequest {
  message: string
  model?: string
  enableGoogleSearch?: boolean
}

interface ApilageResponse {
  message?: string
  success?: boolean
  [key: string]: any
}

export async function generateAIContent(
  message: string,
  type: "suggestions" | "study-plan" | "notes" = "suggestions",
): Promise<ApilageResponse> {
  try {
    const response = await fetch("/api/ai/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        type,
      }),
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`)
    }

    const data: ApilageResponse = await response.json()
    return data
  } catch (error) {
    console.error("Apilage AI Error:", error)
    throw error
  }
}

export function formatAIResponse(response: ApilageResponse): string {
  return response.message || JSON.stringify(response, null, 2)
}
