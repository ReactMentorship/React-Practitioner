import Grid from "@mui/material/Grid";
import React, { JSX } from "react";

import NavBar from "../UI/NavBar";
import { Toast } from "../UI/Toast.tsx/Toast";

interface PageProps {
  /**
   * The page component that will be rendered inside the global Page component template
   */
  children: JSX.Element;
}

/**
 * The global page template which wraps the page component (provided as a prop) in the global site template/header/footer
 */
export default function PageLayout({ children }: PageProps): React.JSX.Element {
  return (
    <Grid container id="app" direction="column" height="100vh" wrap="nowrap">
      <NavBar />
      <Grid
        container
        wrap="nowrap"
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 84px)",
        }}
      >
        {children}
        <Toast />
      </Grid>
    </Grid>
  );
}
