import { ratelimit } from "@/lib/ratelimiter";
import { readEmbeddingsApi } from "@/utils/db/read-embeds-api";
import { auth } from "@clerk/nextjs";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const headersInstance = headers();
  const authorization = headersInstance.get("x-api-key");

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

  try {
    const response = await readEmbeddingsApi({ apiKey: authorization! });

    if (response.code) {
      if (response.code === "42703") {
        return NextResponse.json({
          message: "API key doesn't exist",
        }, {
            status: 400
        });
      }

      return NextResponse.json({
        message: "Error",
        response,
      });
    }
    return NextResponse.json(
      {
        message: "Success",
        response,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({
      message: "Error",
      error,
    });
  }
}
