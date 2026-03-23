import api from "@/lib/api";
import type { LoginRequest, LoginResponse } from "@/types";

// ─────────────────────────────────────────────
//  Auth API
// ─────────────────────────────────────────────

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/api/v1/auth/login/", credentials);
  return response.data;
}
