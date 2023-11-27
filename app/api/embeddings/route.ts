import OpenAI from "openai";
import { ratelimit } from "@/lib/ratelimiter";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { input } = await req.json();
  const openai = new OpenAI();

  const ip = req.ip ?? "127.0.0.1";
  const { success, pending, limit, reset, remaining } = await ratelimit.limit(
    ip
  );

  if (!success) {
    console.log("limit", limit);
    console.log("reset", reset);
    console.log("remaining", remaining);
    return NextResponse.json("Rate Limited", { status: 429 });
  }

  const embedding = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: input,
    encoding_format: "float",
  });

  console.log(embedding);

  return NextResponse.json(
    {
      message: "Success",
      embedding,
    },
    { status: 200 }
  );
}
