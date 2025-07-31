import axios from "axios";
import { BASE_URL } from "./api/axiosConfig";
import { cookies } from "next/headers";

export const verifySession = async () => {
  try {
    const cookieStore = await cookies(); 
    const cookieHeader = cookieStore.toString();
    await axios.get(`${BASE_URL}/auth/me`, {
      headers: { cookie: cookieHeader },
      withCredentials: true,
    });
    return true;
  } catch {
    return false;
  }
};