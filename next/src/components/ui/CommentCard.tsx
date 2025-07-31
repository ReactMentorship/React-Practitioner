import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { CommentResponse } from "@/lib/definitions";

interface CommentsProps {
  comment: CommentResponse;
}

function CommentCard({ comment }: CommentsProps) {
  return (
    <div className="flex gap-4 flex-grow p-4 mb-6 bg-white rounded-lg h-fit">
      <AccountCircleIcon />
      <div className="flex flex-col">
        <strong className="font-bold mb-2">{comment.author}</strong>
        <p>{comment.content}</p>
      </div>
    </div>
  );
}

export default CommentCard;
