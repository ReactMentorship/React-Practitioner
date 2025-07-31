// Layout wrapper for protected routes
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { fetchUser } from "../../auth/authSlice";
import Loading from "../../components/UI/Loading";
import { AppDispatch, RootState } from "../../stores/authStore";
import { Grid } from "@mui/material";

const PrivateRouteLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, status } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Fetch user info only if status is idle (not yet loaded)
    if (status === "idle") {
      dispatch(fetchUser());
    }
  }, [status, dispatch]);

  // Show loading screen while fetching user
  if (status === "loading")
    return (
      <Grid container sx={{ height: "100vh" }}>
        <Loading />
      </Grid>
    );

  // Redirect to login if user is not authenticated
  if (!user) return <Navigate to="/login" replace />;

  // Render protected content
  return <Outlet />;
};

export default PrivateRouteLayout;
