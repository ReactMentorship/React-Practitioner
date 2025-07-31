import { useState } from "react";
import { useParams } from "react-router-dom";

import { usePostByIdQuery } from "../../../api/queries/posts/usePostByIdQuery";
import Banner from "../../UI/Banner";
import Comments from "../../UI/Comments";
import Loading from "../../UI/Loading";
import {
  BannerContainer,
  CommentsContainer,
  Container,
  DescriptionContainer,
  InnerContainer,
} from "./PostPage.styles";

function PostPage() {
  const { postID } = useParams();
  const { data: post, isLoading, refetch } = usePostByIdQuery(postID ?? "");

  // Ideally, this state should be managed directly within the Banner component.
  // However, for educational purposes, it will be handled here to intentionally trigger a re-render.
  const [openImage, setOpenImage] = useState(false);
  const handleOpenImage = () => setOpenImage(true);
  const handleCloseImage = () => setOpenImage(false);

  const getSelectedPost = () => refetch();

  if (!post || !postID || isLoading) return <Loading />;

  return (
    <Container container>
      <InnerContainer size={12}>
        <BannerContainer>
          <Banner
            postImage={post.image}
            postTitle={post.title}
            openImage={openImage}
            handleOpenImage={handleOpenImage}
            handleCloseImage={handleCloseImage}
          />
        </BannerContainer>
        <DescriptionContainer>
          <p>{post.description}</p>
        </DescriptionContainer>
        <CommentsContainer>
          <Comments
            postID={postID}
            comments={post.comments}
            getSelectedPost={getSelectedPost}
          />
        </CommentsContainer>
      </InnerContainer>
    </Container>
  );
}

export default PostPage;
