import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { z } from "zod";

const storeEmbeddingsSchema = z.object({
  user_id: z.string().describe("user ID"),
  name: z.string(),
  embeddings: z.string(),
});

type storeEmbeddingsProps = z.infer<typeof storeEmbeddingsSchema>;

export const storeEmbeddings = async ({
  user_id,
  name,
  embeddings,
}: storeEmbeddingsProps) => {
  const supabase = createServerComponentClient({ cookies });

  try {
    const { data, error } = await supabase
      .from("Storage")
      .insert([
        {
          user_id,
          name,
          embeddings,
        },
      ])
      .select();
      
    if (error?.code) return error;

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
