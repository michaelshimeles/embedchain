import { ratelimit } from "@/lib/ratelimiter";
import { readEmbeddingsApi } from "@/utils/db/read-embeds-api";
import { auth } from "@clerk/nextjs";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyKey } from "@unkey/api";

export async function GET(req: NextRequest) {
  const headersInstance = headers();
  const authorization = headersInstance.get("x-api-key");

  const { result, error } = await verifyKey({
    key: `${authorization}`,
    apiId: "api_EynWSUNephCDFaZPjCJsTW",
  });

  console.log("result", result)
  if (error) {
    // handle potential network or bad request error
    // a link to our docs will be in the `error.docs` field
    return NextResponse.json({
      message: "Error",
      error: error.message,
    });
  }

  if (!result.valid) {
    // do not grant access
    return NextResponse.json({
      message: "Access not granted",
    });
  }

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
        return NextResponse.json(
          {
            message: "API key doesn't exist",
          },
          {
            status: 400,
          }
        );
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
