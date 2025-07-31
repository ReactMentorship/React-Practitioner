import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { cookies } from "next/headers";

import Categories from "@/components/Categories";
import { BASE_URL } from "@/lib/api/axiosConfig";

export async function fetchCategoriesFromServer() {
  const cookie = await cookies();
  const token = cookie.get("accessToken")?.value;
  try {
    const response = await axios.get(`${BASE_URL}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch {
    throw new Error("Failed to fetch categories");
  }
}

export default async function HomePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: fetchCategoriesFromServer,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Categories />
    </HydrationBoundary>
  );
}
