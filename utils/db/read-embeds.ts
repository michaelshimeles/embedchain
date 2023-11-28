import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { z } from "zod";

const readEmbeddingsSchema = z.object({
  user_id: z.string().describe("user ID"),
});

type readEmbeddingsProps = z.infer<typeof readEmbeddingsSchema>;

export const readEmbeddings = async ({ user_id }: readEmbeddingsProps) => {
  const supabase = createServerComponentClient({ cookies });

  try {
    let { data, error } = await supabase
      .from("Storage")
      .select()
      .eq("user_id", user_id);

    if (error?.code) return error;

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
