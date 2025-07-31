import React from "react";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Button } from "@mui/material";

interface EmptyContentPlaceholderProps {
  missingItem: string;
  missingItems?: string;
  onClick: () => void;
}

const EmptyContentPlaceholder = ({
  missingItem,
  missingItems,
  onClick,
}: EmptyContentPlaceholderProps) => {
  return (
    <div className="h-[calc(100vh-80px)] flex flex-col items-center justify-center">
      <SentimentVeryDissatisfiedIcon style={{ fontSize: 50, color: "gray" }} />
      <p className="text-center text-gray-500 mt-4">
        No {missingItems ?? `${missingItem}s`} available. Why not start by
        adding one?
      </p>
      <Button onClick={() => onClick()} color="inherit" className="mt-2">
        Add {missingItem}
      </Button>
    </div>
  );
};

export default EmptyContentPlaceholder;
