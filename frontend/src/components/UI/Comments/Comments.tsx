import { Title, Container, FormContainer } from "./Comments.styles";
import AddCommentForm from "../AddCommentForm";
import CommentCard from "../CommentCard";
import { Comment } from "../../../types";

interface CommentsProps {
  postID: string;
  comments: Comment[];
  getSelectedPost: () => void;
}

function Comments({ postID, comments, getSelectedPost }: CommentsProps) {
  console.log("re-render");
  return (
    <Container>
      <Title>
        <h4>Comments</h4>
      </Title>
      {comments.length > 0 &&
        comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      <FormContainer>
        <AddCommentForm postID={postID} getSelectedPost={getSelectedPost} />
      </FormContainer>
    </Container>
  );
}

export default Comments;
