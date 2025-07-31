import React from "react";
import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";

const Loading: React.FC = () => {
  return (
    <Box className="flex flex-col items-center justify-center h-full">
      <CircularProgress color="inherit" />
      <Typography variant="h6" style={{ marginTop: 20 }}>
        Loading, please wait...
      </Typography>
    </Box>
  );
};

export default Loading;
