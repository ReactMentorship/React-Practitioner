import Link from "next/link";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

interface BannerProps {
  imageUrl: string;
  title: string;
}

function Banner({ imageUrl: postImage, title: postTitle }: BannerProps) {
  return (
    <div
      className="flex flex-grow h-[60vh] text-white bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${postImage})` }}
    >
      <div className="flex-grow p-4  bg-gray-800 bg-opacity-40">
        <Link href="/">
          <div className="flex items-center">
            <ArrowBackIosIcon />
            View Posts
          </div>
        </Link>
        <h3 className="flex flex-grow items-center justify-center text-center font-semibold h-[calc(100%-103px)] p-8">
          {postTitle}
        </h3>
      </div>
    </div>
  );
}

export default Banner;
