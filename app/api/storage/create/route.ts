import { ratelimit } from "@/lib/ratelimiter";
import { storeEmbeddings } from "@/utils/db/store-embeds";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, embeddings } = await req.json();
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
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
    const response = await storeEmbeddings({
      user_id: userId!,
      name,
      embeddings,
    });

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
