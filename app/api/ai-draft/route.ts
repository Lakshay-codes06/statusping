import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(
  request: Request
) {
  console.log("Route hit");

  try {
    const {
      monitorName,
      url,
      error,
    } = await request.json();

    console.log(
      "Request parsed"
    );

    console.log(
      "Calling OpenRouter..."
    );

    const response =
      await client.chat.completions.create({
        model:
          "nvidia/nemotron-3-super-120b-a12b:free",
        messages: [
          {
            role: "user",
            content: `
Generate a professional status page incident update.

Monitor: ${monitorName}
URL: ${url}
Error: ${error}

Write:
1. Summary
2. Customer Impact
3. Investigation Status
4. Next Steps

Keep it professional and concise.
`,
          },
        ],
        temperature: 0.7,
        max_tokens: 300,
      });

    console.log(
      "OpenRouter returned"
    );

    return NextResponse.json({
      draft:
        response.choices?.[0]
          ?.message?.content ||
        "No response generated",
    });
  } catch (error: any) {
    console.error(
      "OPENROUTER ERROR:",
      error
    );

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}