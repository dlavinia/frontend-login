import api from "./axiosInstance";

export type LoginResponse = {

  tokens: {
    refresh: string;
    access: string;
  };
};

export async function login(email: string, password: string): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/auth/login/", { email, password });
  return data;
}
