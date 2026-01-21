import { http } from "./http";

export interface LoginPayload {
  email: string;
  password: string;
}

export const login = (data: LoginPayload) => {
  return http.post("/api/auth/login", data);
};
