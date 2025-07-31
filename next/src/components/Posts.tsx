"use client";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import PostAddIcon from "@mui/icons-material/PostAdd";

import GlobalError from "@/app/error";
import { deletePost, fetchPosts, getPostsByCategory } from "@/lib/api/postsApi";
import { PostsResponse } from "@/lib/definitions";
import { shorten } from "@/utils/helpers";
import CategoryFilter from "./ui/CategoryFilter";
import EmptyContentPlaceholder from "./ui/EmptyContentPlaceholder";
import IconButton from "./ui/IconButton";
import Loading from "./ui/Loading";

const Posts = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryFilter = searchParams.get("category");

  const { mutate: removePost } = useMutation({
    mutationFn: deletePost,
    mutationKey: ["posts"],
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      if (categoryFilter)
        queryClient.invalidateQueries({ queryKey: ["postsByCategory"] });
    },
  });

  const { data: postsByCategory } = useQuery({
    queryKey: ["postsByCategory", categoryFilter],
    queryFn: getPostsByCategory,
  });

  const {
    data: allPosts,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    enabled: true,
  });

  const posts = searchParams.get("category") ? postsByCategory : allPosts;

  const navigateToPost = (post: PostsResponse) => {
    router.push(`/posts/${post.id}`);
  };

  const handleOpenForm = (post?: PostsResponse) => {
    // Get the current query parameters as a string
    const currentParams = searchParams.toString();
    const queryString = currentParams ? `?${currentParams}` : "";

    // Build the new route, preserving query parameters if they exist
    const newRoute = post
      ? `/posts/edit/${post.id}${queryString}`
      : `/posts/create${queryString}`;

    router.push(newRoute);
  };

  const handleDeletePost = (postID: string) => {
    removePost(postID);
  };

  if (isLoading)
    return (
      <div className="h-[calc(100vh-80px)]">
        <Loading />
      </div>
    );

  if (isError) return <GlobalError error={error} />;

  return (
    <div className="w-full h-full overflow-auto bg-[#f9fafb]">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center m-4">
          <CategoryFilter />
          <div className="flex justify-end p-2">
            <IconButton onClick={() => handleOpenForm()}>
              <PostAddIcon />
            </IconButton>
          </div>
        </div>
        {(!posts || posts.length === 0) && (
          <EmptyContentPlaceholder
            missingItem="post"
            onClick={handleOpenForm}
          />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {posts?.map((post) => (
            <div
              key={post.id}
              className="relative flex flex-col justify-between bg-cover bg-center bg-no-repeat text-white cursor-pointer group h-80"
              style={{ backgroundImage: `url(${post.image})` }}
              onClick={() => navigateToPost(post)}
            >
              <div className="flex flex-col justify-between bg-gray-800 bg-opacity-40 p-6 h-full">
                <div className="flex flex-col">
                  <h1 className="text-2xl font-bold">{post.title}</h1>
                  <h3 className="mt-2">
                    {post.comments.length}
                    {post.comments.length > 1 ? " Comments" : " Comment"}
                  </h3>
                  <h3 className="mt-2">{shorten(post.description, 70)}</h3>
                  <h1 className="mt-2 underline">{post.category?.name}</h1>
                </div>
                <div className="flex justify-end gap-4 mt-4 invisible group-hover:visible">
                  <IconButton
                    color="inherit"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenForm(post);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="inherit"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePost(post.id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
