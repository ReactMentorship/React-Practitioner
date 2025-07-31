"use client";
import GlobalError from "@/app/error";
import NotFound from "@/app/not-found";
import Loading from "@/components/ui/Loading";
import { PostForm } from "@/components/forms/PostForm";
import { getPost } from "@/lib/api/postsApi";
import { useQuery } from "@tanstack/react-query";
import React, { Usable, use } from "react";

interface EditPostProps {
  params: Usable<{ id: string }>;
}

const EditPost = ({ params }: EditPostProps) => {
  const { id } = use(params);

  const {
    data: post,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: getPost,
  });

  if (isLoading)
    return (
      <div className="h-[calc(100vh-80px)]">
        <Loading />
      </div>
    );
  if (isError) return <GlobalError error={error} />;
  if (!post) return <NotFound />;

  return <PostForm post={post} />;
};

export default EditPost;
