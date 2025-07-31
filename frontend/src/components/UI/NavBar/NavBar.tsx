import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../api/queries/auth/logout";
import { fetchUser } from "../../../auth/authSlice";
import { AppDispatch, RootState } from "../../../stores/authStore";
import { useNotificationStore } from "../../../stores/notificationStore";
import NotificationPopover from "../NotificationPopover/NotificationPopover";

export default function NavBar(): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const notify = useNotificationStore((state) => state.notify);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser({
      onSuccess: () => {
        dispatch(fetchUser());
        navigate("/login");
      },
      onError: () => notify("Someting went wrong", "error"),
    });
  };

  return (
    <Grid
      sx={{
        display: "flex",
        padding: 2,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#0065c9",
        height: "84px",
      }}
    >
      <NavLink
        to="/"
        style={{
          textDecoration: "none",
          color: "white",
          display: "flex",
          gap: "16px",
          alignItems: "center",
        }}
      >
        <TravelExploreIcon sx={{ width: 45, height: 45 }} />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" fontWeight="bold">
            Discovering the World
          </Typography>
          <Typography variant="caption" alignItems="center">
            Making your Life Easier
          </Typography>
        </Box>
      </NavLink>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          gap: 2,
        }}
      >
        <NavLink
          to="/categories"
          style={({ isActive }) => {
            return {
              textDecoration: "none",
              fontWeight: "bold",
              color: "white",
              backgroundColor: isActive ? "#004284" : "#1e8fff",
              borderRadius: "8px",
              padding: "8px",
            };
          }}
        >
          Categories
        </NavLink>
        {user ? (
          <>
            <NavLink
              to="/login"
              onClick={handleLogout}
              style={{
                textDecoration: "none",
                fontWeight: "bold",
                color: "white",
                backgroundColor: "#1e8fff",
                borderRadius: "8px",
                padding: "8px",
              }}
            >
              Logout
            </NavLink>
            <NotificationPopover />
          </>
        ) : (
          <NavLink
            to="/login"
            style={({ isActive }) => {
              return {
                textDecoration: "none",
                fontWeight: "bold",
                color: "white",
                backgroundColor: isActive ? "#004284" : "#1e8fff",
                borderRadius: "8px",
                padding: "8px",
              };
            }}
          >
            Login
          </NavLink>
        )}
      </Box>
    </Grid>
  );
}
