import { CommentResponse } from "@/lib/definitions";
import CommentCard from "@/components/ui/CommentCard";
import CommentForm from "@/components/forms/CommentForm";

interface CommentsProps {
  comments: CommentResponse[];
  postId: string;
}

function Comments({ comments, postId }: CommentsProps) {
  return (
    <div className="w-1/2 flex flex-col justify-center">
      <div>
        <h4>Comments</h4>
      </div>
      {comments.length > 0 &&
        comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      <div>
        <CommentForm postId={postId} />
      </div>
    </div>
  );
}

export default Comments;
