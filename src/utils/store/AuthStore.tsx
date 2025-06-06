import { create } from "zustand";

interface User {
  telegramId: number | null;
  username: string | null;
  name: string;
  isAdmin: boolean;
}

interface AuthState {
  user: User | null;
  isAuth: boolean;
  setUser: (user: User) => void;
  setIsAuth: (auth: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuth: false,
  setUser: (user) => set(() => ({ user })),
  setIsAuth: (isAuth) => set(() => ({ isAuth })),
  logout: () => set(() => ({ user: null, isAuth: false })),
}));
