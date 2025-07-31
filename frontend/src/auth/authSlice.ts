// Redux slice to manage authentication state
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getMe } from "../api/services/auth/getMe";
import { MeResponse } from "../types";

// Async thunk to fetch user info from /me endpoint
export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  const response = await getMe();
  return response.user;
});

interface AuthState {
  user: MeResponse["user"] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Initial state for authentication
const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Clears user data and resets status
    logout() {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.error = action.error.message || "Failed to fetch user";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
