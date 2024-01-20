import { useQuery } from "@tanstack/react-query";

async function fetchStoredEmbeds(userId: string) {
  console.log("userId2", userId);

  try {
    const response = await fetch("/api/storage/read", {
      method: "POST",
      body: JSON.stringify({
        userId,
      }),
    });

    const result = await response?.json();

    console.log("result", result);

    return result;
  } catch (error) {
    return error;
  }
}

export const useGetStoredEmbeds = (userId: string, response: any) => {
  return useQuery({
    queryKey: ["get-embeds", userId],
    queryFn: () => fetchStoredEmbeds(userId),
    initialData: response,
  });
};
