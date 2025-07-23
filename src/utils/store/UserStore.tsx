import { create } from "zustand";
import axios from "axios";
import { baseUrl } from "../consts/url-backend";
import type { User } from "../types/user";

interface UserStore {
  users: User[];
  setUsers: (users: User[]) => void;
  user: User | null;
  setUser: (user: User) => void;
  fetchUser: (userId: number) => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  users: [],
  fetchUser: async (userId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${baseUrl}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ user: response.data });
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  },
  setUsers: (users) => set({ users }),
}));
