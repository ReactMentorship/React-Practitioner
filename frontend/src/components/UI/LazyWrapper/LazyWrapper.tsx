import { Grid } from "@mui/material";
import { Suspense } from "react";

import Loading from "../Loading";

const LazyWrapper = ({ children }: { children: React.ReactNode }) => (
  <Suspense
    fallback={
      <Grid container sx={{ height: "100vh" }}>
        <Loading />
      </Grid>
    }
  >
    {children}
  </Suspense>
);
export default LazyWrapper;
