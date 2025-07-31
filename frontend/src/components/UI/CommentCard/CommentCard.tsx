import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Typography } from "@mui/material";

import { Comment } from "../../../types";
import { Author, Container, Content } from "./CommentCard.styles";

interface CommentsProps {
  comment: Comment;
}

function CommentCard({ comment }: CommentsProps) {
  return (
    <Container>
      <AccountCircleIcon />
      <Content>
        <Author>{comment.author}</Author>
        <Typography>{comment.content}</Typography>
      </Content>
    </Container>
  );
}

export default CommentCard;
