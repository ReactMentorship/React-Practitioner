import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function NotificationPopover() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Zustand store selectors
  const notifications = [
    {
      id: "3a0a235a-35f3-4b6d-addf-f45331528afb",
      message: "Welcome back!",
      type: "success",
      active: false,
    },
  ];

  // Open popover anchored to the icon
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Close popover
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      {/* Notification icon button */}
      <IconButton onClick={handleOpen} sx={{ color: "white" }}>
        <NotificationsIcon />
      </IconButton>

      {/* Popover for notification history */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{ sx: { width: 320, maxHeight: 400 } }}
      >
        <Box p={2}>
          <Typography variant="h6">Notification History</Typography>
          <Divider sx={{ mt: 1, mb: 2 }} />
          {/* Empty state */}
          {notifications.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No notifications available.
            </Typography>
          ) : (
            <List dense>
              {notifications.map((n) => (
                <ListItem
                  key={n.id}
                  secondaryAction={
                    <IconButton edge="end" onClick={() => {}} size="small">
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={n.message}
                    secondary={`Type: ${n.type}`}
                    sx={{
                      opacity: n.active ? 1 : 0.5,
                      textDecoration: n.active ? "none" : "line-through",
                    }}
                  />
                </ListItem>
              ))}
            </List>
          )}

          {/* Hide all button */}
          {notifications.length > 0 && (
            <Box mt={1} display="flex" justifyContent="flex-end">
              <Button onClick={() => {}} size="small" color="error">
                Hide All
              </Button>
            </Box>
          )}
        </Box>
      </Popover>
    </>
  );
}
