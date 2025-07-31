import { createContext } from "react";
import { MeResponse } from "../../types";

interface AuthContextProps {
  user: MeResponse["user"];
  getUserInfo: () => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  getUserInfo: async () => {},
  logout: () => {},
});
