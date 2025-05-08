import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { title, description, imageUrl } = await req.json();

    if (!title || !description) {
      return NextResponse.json(
        { error: "Missing title or description" },
        { status: 400 }
      );
    }

    const GEMINI_KEY = process.env.GEMINI_KEY;
    if (!GEMINI_KEY) {
      return NextResponse.json(
        { error: "Gemini API key not set" },
        { status: 500 }
      );
    }

    // Compose a prompt for Gemini to generate a quiz schema
    const prompt = `
You are an expert quiz generator. Given the following title and description, generate a quiz in JSON format with 5 questions. Each question should have 4 options and indicate the correct option by index (0-based). The JSON should have this structure:

{
  "title": string,
  "description": string,
  "questions": [
    {
      "question": string,
      "options": [string, string, string, string],
      "correctOption": number
    },
    ...
  ]
}

Title: ${title}
Description: ${description}

Respond ONLY with the JSON object.
`;

    // Call Gemini API
    const geminiRes = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
        GEMINI_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    if (!geminiRes.ok) {
      const error = await geminiRes.text();
      return NextResponse.json(
        { error: "Gemini API error", details: error },
        { status: 500 }
      );
    }

    const geminiData = await geminiRes.json();
    console.log(geminiData?.candidates?.[0]?.content);
    // Extract the model's text response
    const text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      return NextResponse.json(
        { error: "No response from Gemini" },
        { status: 500 }
      );
    }

    // Try to parse the JSON from Gemini's response
    let quizJson;
    try {
      quizJson = JSON.parse(text);
      console.log(quizJson);
    } catch {
      // If Gemini returns code block markdown, strip it
      const match =
        text.match(/```json\s*([\s\S]*?)```/i) ||
        text.match(/```\s*([\s\S]*?)```/i);
      if (match) {
        try {
          quizJson = JSON.parse(match[1]);
        } catch {
          return NextResponse.json(
            { error: "Failed to parse Gemini JSON" },
            { status: 500 }
          );
        }
      } else {
        return NextResponse.json(
          { error: "Failed to parse Gemini JSON" },
          { status: 500 }
        );
      }
    }

    // Add a dummy image link
    quizJson.imageUrl = imageUrl;

    // Call the createQuiz API
    const createQuizRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/createQuiz`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizJson),
      }
    );

    const createQuizData = await createQuizRes.json();

    if (!createQuizRes.ok) {
      return NextResponse.json(
        { error: "Failed to create quiz", details: createQuizData },
        { status: 500 }
      );
    }

    return NextResponse.json(createQuizData);
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error", details: String(err) },
      { status: 500 }
    );
  }
}
