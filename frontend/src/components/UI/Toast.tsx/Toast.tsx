import { Alert, Snackbar } from "@mui/material";
import { useNotificationStore } from "../../../stores/notificationStore";
import type { Notification } from "../../../stores/notificationStore";

export const Toast = () => {
  // Select notifications and hideNotification action from the store
  const notifications = useNotificationStore((s) => s.notifications);
  const hideNotification = useNotificationStore((s) => s.hideNotification);

  return (
    <>
      {/* Render only active notifications */}
      {notifications.map((n: Notification) => (
        <Snackbar
          key={n.id}
          open={n.active}
          autoHideDuration={6000} // Auto close Snackbar after 6 seconds
          onClose={() => hideNotification(n.id)} // Hide notification when Snackbar closes
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }} // Position on screen
        >
          <Alert
            severity={n.type} // Sets alert type: success, error, info, or warning
            onClose={() => hideNotification(n.id)} // Hide notification on Alert close
            sx={{ width: "100%" }}
          >
            {n.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};
