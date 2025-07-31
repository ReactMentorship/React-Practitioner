import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import ImageDialog from "../ImageDialog/ImageDialog";
import { BannerContent, BannerTitle, Container } from "./Banner.styles";

interface BannerProps {
  postImage: string;
  postTitle: string;
  openImage: boolean;
  handleOpenImage: () => void;
  handleCloseImage: () => void;
}

function Banner({
  postImage,
  postTitle,
  openImage,
  handleOpenImage,
  handleCloseImage,
}: BannerProps) {
  const navigate = useNavigate();

  const navigateToHomePage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    navigate("/");
  };

  return (
    <>
      <Container image={postImage} onClick={handleOpenImage}>
        <BannerContent>
          <Button
            sx={{ color: "white" }}
            startIcon={<ArrowBackIosIcon />}
            onClick={navigateToHomePage}
          >
            View Posts
          </Button>
          <BannerTitle variant="h3">{postTitle}</BannerTitle>
        </BannerContent>
      </Container>
      <ImageDialog
        open={openImage}
        imageUrl={postImage}
        onClose={handleCloseImage}
      />
    </>
  );
}

export default Banner;
