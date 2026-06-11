import { api } from './api';

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    
    if (response.data.token) {
      localStorage.setItem('@UniTick:token', response.data.token);
      localStorage.setItem('@UniTick:user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  },

  logout() {
    localStorage.removeItem('@UniTick:token');
    localStorage.removeItem('@UniTick:user');
  }
};