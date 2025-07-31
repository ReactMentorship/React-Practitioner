import { create } from "zustand";

// Define the shape of a single notification
export type Notification = {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  active: boolean; // Used to control visibility without deleting the notification
};

// Define the shape of the Zustand store
type NotificationStore = {
  notifications: Notification[]; // List of all notifications (active and inactive)
  notify: (message: string, type?: Notification["type"]) => void; // Add a new notification
  hideNotification: (id: string) => void; // Mark a notification as inactive
};

// Create the Zustand store
export const useNotificationStore = create<NotificationStore>()((set) => ({
  // Initial state
  notifications: [],
  // Adds a new notification to the list
  notify: (message, type = "info") => {
    const id = crypto.randomUUID(); // Generate a unique ID for the notification
    const newNotification: Notification = {
      id,
      message,
      type,
      active: true, // New notifications are active by default
    };

    // Add the new notification to the state
    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));

    // Automatically hide the notification after 6 seconds
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, active: false } : n
        ),
      }));
    }, 6000);
  },

  // Marks a notification as inactive (used to hide it from the UI)
  hideNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, active: false } : n
      ),
    })),
}));
