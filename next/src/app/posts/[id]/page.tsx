"use client";
import { getPost } from "@/lib/api/postsApi";
import Banner from "@/components/ui/Banner";
import Comments from "@/components/Comments";
import { useQuery } from "@tanstack/react-query";
import { Usable, use } from "react";
import Loading from "@/components/ui/Loading";
import NotFound from "@/app/not-found";
import GlobalError from "@/app/error";

interface PostPageProps {
  params: Usable<{ id: string }>;
}

const PostPage: React.FC<PostPageProps> = ({ params }) => {
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

  return (
    <div className="flex flex-col flex-grow bg-[#eaecf0] h-[calc(100vh-80px)] overflow-y-auto">
      <div className="flex-grow">
        <Banner imageUrl={post.image} title={post.title} />
      </div>
      <div className="p-4">
        <p>{post.description}</p>
      </div>
      <div className="flex-grow p-4 flex justify-center">
        <Comments comments={post.comments} postId={id} />
      </div>
    </div>
  );
};

export default PostPage;
