"use client";
import { MouseEventHandler } from "react";

interface CreatePostButtonProps {
  children?: React.ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  color?: "default" | "primary" | "secondary" | "inherit";
}

const IconButton = ({
  children,
  onClick,
  color = "default",
}: CreatePostButtonProps) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return "text-white bg-black bg-opacity-30 hover:bg-opacity-45";
      case "secondary":
        return "text-white bg-gray-800 bg-opacity-30 hover:bg-opacity-45";
      case "inherit":
        return "text-white bg-gray-600 bg-opacity-30 hover:bg-opacity-45";
      default:
        return "text-black hover:bg-gray-200";
    }
  };

  return (
    <button
      className={`font-bold py-2 px-3 rounded-full ${getColorClasses(color)}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default IconButton;
