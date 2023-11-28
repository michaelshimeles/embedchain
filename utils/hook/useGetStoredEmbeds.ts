import { useQuery } from "@tanstack/react-query";

async function fetchStoredEmbeds(user_id: string) {
  try {
    const response = await fetch("/api/storage/read");

    const result = await response?.json();

    return result;
  } catch (error) {
    return error;
  }
}

export const useGetStoredEmbeds = (user_id: string) => {
  return useQuery({
    queryKey: ["get-embeds", user_id],
    queryFn: () => fetchStoredEmbeds(user_id),
  });
};
