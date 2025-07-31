import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Box, Button, Typography } from "@mui/material";

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
    <Box
      sx={{
        height: "calc(100vh - 80px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "gray",
      }}
    >
      <SentimentVeryDissatisfiedIcon sx={{ fontSize: 50, color: "gray" }} />
      <Typography variant="body1" sx={{ mt: 2, color: "gray" }}>
        No {missingItems ?? `${missingItem}s`} available. Why not start by adding one?
      </Typography>
      <Button onClick={onClick} color="inherit" sx={{ mt: 2 }}>
        Add {missingItem}
      </Button>
    </Box>
  );
};

export default EmptyContentPlaceholder;
