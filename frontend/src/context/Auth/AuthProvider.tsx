import { Grid } from "@mui/material";
import React, { useCallback, useEffect, useReducer } from "react";

import { getMe } from "../../api/services/auth/getMe";
import Loading from "../../components/UI/Loading";
import { MeResponse } from "../../types";
import { AuthContext } from "./AuthContext";
// import { WithUseReducerCorrect } from "./UseReducerExample";
// import WithUseStateManualUpdate from "./UseStateExample";

interface AuthState {
  user: MeResponse["user"] | null;
  loading: boolean;
}

type AuthAction =
  | { type: "SET_USER"; payload: MeResponse["user"] }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "LOGOUT" };

const initialState: AuthState = {
  user: null,
  loading: true,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

interface AuthProviderProps {
  children: React.JSX.Element;
}

export function AuthProvider({
  children,
}: AuthProviderProps): React.JSX.Element {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const getUserInfo = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const data = await getMe();
      if (data.user) {
        dispatch({ type: "SET_USER", payload: data.user });
      }
    } catch {
      dispatch({ type: "SET_USER", payload: null });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: "LOGOUT" });
  }, []);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  return (
    <AuthContext.Provider value={{ user: state.user, getUserInfo, logout }}>
      {state.loading ? (
        <Grid container sx={{ height: "100vh" }}>
          <Loading />
        </Grid>
      ) : (
        <>
          {/* <WithUseReducerCorrect />
          <WithUseStateManualUpdate /> */}
          {children}
        </>
      )}
    </AuthContext.Provider>
  );
}
