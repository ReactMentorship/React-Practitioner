import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Grid, IconButton, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useDeletePostMutation } from "../../../api/queries/posts/useDeletePostMutation";
import { shorten } from "../../../common/utils";
import { Post } from "../../../types";
import {
  CardActions,
  CardContainer,
  CardContent,
  PostCard,
} from "./PostList.styles";

interface PostListProps {
  posts: Post[];
  handleOpenForm: (defaultValues?: Post) => void;
}

function PostListComponent({ posts, handleOpenForm }: PostListProps) {
  const { mutate: removePost } = useDeletePostMutation();
  const navigate = useNavigate();
  const prevPostsLength = useRef(posts.length);
  const lastPostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const isNewPostAdded = posts.length > prevPostsLength.current;

    if (isNewPostAdded && lastPostRef.current) {
      prevPostsLength.current = posts.length;
      lastPostRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [posts]);

  console.log("re-render");

  return (
    <Grid container columns={{ md: 12, xs: 12 }}>
      {posts.map((post, idx) => (
        <PostCard
          ref={idx === posts.length - 1 ? lastPostRef : undefined}
          size={{ md: posts.length === 1 ? 12 : 6 }}
          key={post.id}
          image={post.image}
          onClick={() => navigate(`/post/${post.id}`)}
        >
          <CardContainer>
            <CardContent>
              <h1>{post.title}</h1>
              <h3>
                {post.comments.length}
                {post.comments.length > 1 ? " Comments" : " Comment"}
              </h3>
              <h3>{shorten(post.description, 70)}</h3>
              <Typography variant="overline">{post.category}</Typography>
            </CardContent>
            <CardActions className="card-actions">
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
                  removePost(post);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </CardContainer>
        </PostCard>
      ))}
    </Grid>
  );
}

// Custom comparison function to avoid unnecessary re-renders
function areEqual(prevProps: PostListProps, nextProps: PostListProps): boolean {
  return (
    JSON.stringify(prevProps.posts) === JSON.stringify(nextProps.posts) &&
    prevProps.handleOpenForm === nextProps.handleOpenForm
  );
}

const PostList = React.memo(PostListComponent, areEqual);

export default PostList;
