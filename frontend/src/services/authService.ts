import { apiClient } from '../api/axiosClient';
import { MOCK_CURRENT_USER } from '../api/mockData';
import type { User, UserRole } from '../types';

export interface LoginResponse {
  user: User;
  token: string;
}

export const authService = {
  async login(email: string, passwordHash: string, selectedRole: UserRole = 'USER'): Promise<LoginResponse> {
    try {
      const response = await apiClient.post('/auth/login', { email, password: passwordHash });
      const { user, access_token } = response.data.user ? response.data : response.data.data;
      localStorage.setItem('ridewise_token', access_token);
      localStorage.setItem('ridewise_user', JSON.stringify(user));
      return { user, token: access_token };
    } catch {
      // Mock login fallback
      const mockUser: User = {
        ...MOCK_CURRENT_USER,
        email,
        name: email.split('@')[0].toUpperCase(),
        role: selectedRole
      };
      const mockToken = 'mock_jwt_token_ridewise_' + Date.now();
      localStorage.setItem('ridewise_token', mockToken);
      localStorage.setItem('ridewise_user', JSON.stringify(mockUser));
      return { user: mockUser, token: mockToken };
    }
  },

  async register(name: string, email: string, password: string = 'password123', role: UserRole = 'USER'): Promise<LoginResponse> {
    try {
      const response = await apiClient.post('/auth/register', { name, email, password, role });
      const { user, access_token } = response.data.user ? response.data : response.data.data;
      localStorage.setItem('ridewise_token', access_token);
      localStorage.setItem('ridewise_user', JSON.stringify(user));
      return { user, token: access_token };
    } catch {
      const mockUser: User = {
        id: 'u-' + Date.now(),
        name,
        email,
        role,
        createdAt: new Date().toISOString()
      };
      const mockToken = 'mock_jwt_token_ridewise_' + Date.now();
      localStorage.setItem('ridewise_token', mockToken);
      localStorage.setItem('ridewise_user', JSON.stringify(mockUser));
      return { user: mockUser, token: mockToken };
    }
  },

  getCurrentUser(): User | null {
    const stored = localStorage.getItem('ridewise_user');
    if (!stored) return MOCK_CURRENT_USER;
    try {
      return JSON.parse(stored);
    } catch {
      return MOCK_CURRENT_USER;
    }
  },

  logout(): void {
    localStorage.removeItem('ridewise_token');
    localStorage.removeItem('ridewise_user');
  }
};
