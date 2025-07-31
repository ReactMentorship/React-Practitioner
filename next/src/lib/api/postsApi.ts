import { QueryFunctionContext } from "@tanstack/react-query";
import axiosInstance from "./axiosConfig";
import { PostsResponse, PostResponse, NewPost } from "@/lib/definitions";

/**
 * Fetch all posts.
 * @returns The fetched posts.
 */
export const fetchPosts = async (): Promise<PostsResponse[]> => {
  const { data }: { data: PostsResponse[] } = await axiosInstance.get("/posts");
  return data;
};

/**
 * Fetch posts by category.
 * @param selectedCategoryID - The ID of the selected category.
 * @returns The fetched posts.
 */
export const getPostsByCategory = async (
  ctx: QueryFunctionContext
): Promise<PostsResponse[]> => {
  const [, selectedCategoryID] = ctx.queryKey;
  if (!selectedCategoryID) return [];
  const { data } = await axiosInstance.get<PostsResponse[]>(
    `/posts/category/${selectedCategoryID}`
  );
  return data;
};

/**
 * Fetch a single post.
 * @param postID - The ID of the post to fetch.
 * @returns The fetched post.
 */
export const getPost = async (
  ctx: QueryFunctionContext
): Promise<PostResponse> => {
  const [, postID] = ctx.queryKey;
  const { data } = await axiosInstance.get<PostResponse>(`/posts/${postID}`);
  return data;
};

/**
 * Create a new post.
 * @param newPost - The data for the new post.
 * @returns The created post.
 */
export const addPost = async (newPost: NewPost): Promise<PostResponse> => {
  const { data } = await axiosInstance.post<PostResponse>("/posts", newPost);
  return data;
};

/**
 * Update an existing post.
 * @param postID - The ID of the post to update.
 * @param updatedPost - The updated data for the post.
 * @returns The updated post.
 */
export const updatePost = async (
  postID: string,
  updatedPost: NewPost
): Promise<PostResponse> => {
  const { data } = await axiosInstance.patch<PostResponse>(
    `/posts/${postID}`,
    updatedPost
  );
  return data;
};

/**
 * Delete a post.
 * @param postID - The ID of the post to delete.
 * @returns The response from the server.
 */
export const deletePost = async (postID: string): Promise<void> => {
  await axiosInstance.delete(`/posts/${postID}`);
};
