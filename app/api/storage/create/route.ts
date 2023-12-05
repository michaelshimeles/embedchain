import { ratelimit } from "@/lib/ratelimiter";
import { storeEmbeddings } from "@/utils/db/store-embeds";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import Arweave from "arweave";
import { JWKInterface } from "arweave/node/lib/wallet";

export async function POST(req: NextRequest) {
  // #1 Get the data from the POST request; encoded as base64 string.
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
    // #2 Make a connection to Arweave server; following standard example.
    const arweave = Arweave.init({
      host: "arweave.net",
      port: 443,
      protocol: "https",
    });

    // #3 Load our key from the .env file
    const arweaveKey = JSON.parse(process.env.ARWEAVE_KEY!) as JWKInterface;

    // #4 Check out wallet balance. We should probably fail if too low?
    const arweaveWallet = await arweave.wallets.jwkToAddress(arweaveKey);
    const arweaveWalletBallance = await arweave.wallets.getBalance(
      arweaveWallet
    );
    console.log("arweaveWalletBallance", arweaveWalletBallance);

    if (arweaveWalletBallance === "0") {
      return NextResponse.json(
        {
          message: "There's not enough balance",
        },
        { status: 400 }
      );
    }

    // #5 Core flow: create a transaction, upload and wait for the status!
    let transaction = await arweave.createTransaction(
      { data: String(embeddings) },
      arweaveKey
    );

    transaction.addTag("Content-Type", "text/plain");
    // Add another tag, maybe a key

    await arweave.transactions.sign(transaction, arweaveKey);
    const res = await arweave.transactions.post(transaction);
    console.log("res", res);

    if (res?.status === 400) {
      return NextResponse.json(
        {
          message: res?.statusText,
          error: res?.data?.error,
        },
        { status: 400 }
      );
    }

    const status = await arweave.transactions.getStatus(transaction.id);

    console.log("status", status);
    console.log("status", `https://www.arweave.net/${transaction.id}`);

    try {
      const response = await storeEmbeddings({
        user_id: userId!,
        name,
        embeddings,
        perma_link: `https://www.arweave.net/${transaction.id}`,
      });

      return NextResponse.json(
        {
          message: "Success",
          response,
        },
        { status: 200 }
      );
    } catch (error) {
      console.log("error", error);
      return NextResponse.json({
        error,
      });
    }
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({
      message: "Error",
      error,
    });
  }
}
