export interface User {
  username: string;
  password: string;
}

export interface AuthResponse {
  message: string;
}

export interface AuthLoginResponse {
  accessToken: string;
  message?: string;
}
