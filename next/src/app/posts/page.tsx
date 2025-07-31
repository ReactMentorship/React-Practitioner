import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { cookies } from "next/headers";

import Posts from "@/components/Posts";
import { BASE_URL } from "@/lib/api/axiosConfig";

export async function fetchPostsFromServer() {
  const cookie = await cookies();
  const token = cookie.get("accessToken")?.value;
  try {
    const response = await axios.get(`${BASE_URL}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch {
    throw new Error("Failed to fetch posts");
  }
}

export default async function HomePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: fetchPostsFromServer,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Posts />
    </HydrationBoundary>
  );
}
