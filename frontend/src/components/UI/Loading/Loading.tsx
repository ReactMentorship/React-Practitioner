import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";

/**
 * This shows a horizontally and vertically centred loading spinner to use when a component is loading content to display
 */
export default function Loading(): React.JSX.Element {
  return (
    <Grid
      role="status"
      aria-live="polite"
      container
      sx={{
        flexGrow: 1,
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Grid>
  );
}
