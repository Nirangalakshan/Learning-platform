import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { experimentTitle, experimentId } = await request.json();

    if (!experimentTitle) {
      return NextResponse.json(
        { success: false, error: "Experiment title is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.APILAGE_API_KEY;
    const apiUrl = process.env.APILAGE_API_URL;

    if (!apiKey || !apiUrl) {
      return NextResponse.json(
        { error: "Apilage AI credentials not configured" },
        { status: 500 }
      );
    }

    const prompt = `Generate a lab report template for the following chemistry experiment: "${experimentTitle}"

Please provide the following sections in a structured format:
1. Aim: A clear statement of what the experiment aims to achieve
2. Observations: Common observations that students should record (use bullet points, include measurement placeholders like "_____ ml")
3. Calculations: Relevant formulas and calculation guidelines
4. Result: A template for stating the final result (with placeholders)
5. Conclusion: A brief template for conclusion points

Format the response as JSON with these exact keys: aim, observations, calculations, result, conclusion.
Make it educational and suitable for high school chemistry students in Sri Lanka.`;

    const headers = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    };

    const payload = {
      message: prompt,
      model: "APILAGEAI-FREE",
      enableGoogleSearch: false,
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Apilage AI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const text = data.response || "";

    // Try to parse as JSON, if it fails, return structured text
    let parsedData;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch =
        text.match(/```json\n([\s\S]*?)\n```/) ||
        text.match(/```\n([\s\S]*?)\n```/);
      const jsonText = jsonMatch ? jsonMatch[1] : text;
      parsedData = JSON.parse(jsonText);
    } catch (e) {
      // If JSON parsing fails, create structured response from text
      parsedData = {
        aim:
          text.split("Aim:")[1]?.split("\n\n")[0]?.trim() ||
          "To perform the experiment and record observations",
        observations:
          text.split("Observations:")[1]?.split("\n\n")[0]?.trim() ||
          "Record all observations carefully",
        calculations:
          text.split("Calculations:")[1]?.split("\n\n")[0]?.trim() ||
          "Show all calculation steps",
        result:
          text.split("Result:")[1]?.split("\n\n")[0]?.trim() ||
          "State the final result",
        conclusion:
          text.split("Conclusion:")[1]?.split("\n\n")[0]?.trim() ||
          "Summarize findings",
      };
    }

    return NextResponse.json({
      success: true,
      data: parsedData,
    });
  } catch (error) {
    console.error("Error generating lab report:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate lab report template",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
