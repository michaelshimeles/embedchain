import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { z } from "zod";

const readEmbeddingsSchema = z.object({
  apiKey: z.string().describe("api key"),
});

type readEmbeddingsProps = z.infer<typeof readEmbeddingsSchema>;

export const readEmbeddingsApi = async ({ apiKey }: readEmbeddingsProps) => {
  const supabase = createServerComponentClient({ cookies });

  try {
    let { data: storageData, error } = await supabase
      .from("User")
      .select()
      .eq("apiKey", apiKey);

    console.log("error", error);
    if (error?.code) return error;

    if (storageData?.[0]?.id) {
      let { data, error } = await supabase
        .from("Storage")
        .select()
        .eq("user_id", storageData?.[0]?.user_id);


      return data;
    }
  } catch (error: any) {
    return error;
  }
};
