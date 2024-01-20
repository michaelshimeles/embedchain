import { useQuery } from "@tanstack/react-query";

async function fetchStoredEmbeds(userId: string) {
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

// useGetStoredEmbeds Hook
export const useGetStoredEmbeds = (userId: string, result: any) => {
  // console.log('result',result)
  return useQuery({
    queryKey: ["get-embeds", userId],
    queryFn: () => fetchStoredEmbeds(userId),
    initialData: result,
    // You can add options like 'staleTime' to manage when the data should be refetched
  });
};
