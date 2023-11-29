import { useQuery } from "@tanstack/react-query";
import { userRead } from "../db/userRead";

async function fetchUserInfo(user_id: string) {
  try {
    const response: any = await userRead(user_id);

    return response;
  } catch (error) {
    return error;
  }
}

export const useGetUserInfo = (user_id: string) => {
  return useQuery({
    queryKey: ["get-user-info", user_id],
    queryFn: () => fetchUserInfo(user_id),
  });
};
