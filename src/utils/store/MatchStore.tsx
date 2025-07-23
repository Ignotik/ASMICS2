import { create } from "zustand";
import type { Match, MatchFormData } from "../types/tournament";
import axios from "axios";
import { baseUrl } from "../consts/url-backend";

interface MatchStore {
  createMatch: (data: MatchFormData) => void;
  updateMatch: (id: number, team: Match) => void;
  deleteMatch: (id: number) => void;
  fetchMatches: () => void;
  matches: Match[];
  isLoading: boolean;
  error: string | null;
}

export const useMatchStore = create<MatchStore>((set) => ({
  matches: [],
  isLoading: false,
  error: null,
  fetchMatches: async () => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`${baseUrl}/matches`);
      const matches = await response.data;
      set({ matches, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch matches", isLoading: false });
      console.error("Error fetching matches:", error);
    }
  },
  createMatch: async (data) => {
    try {
      set({ isLoading: true });
      const response = await axios.post(`${baseUrl}/matches`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: "Failed to create match", isLoading: false });
      console.error("Error creating match:", error);
    }
  },
  updateMatch: async (id: number, data: Match) => {
    try {
      set({ isLoading: true });
      await axios.put(`${baseUrl}/matches/${id}`, data);
      set((state) => ({
        matches: state.matches.map((match) => (match.id === id ? data : match)),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: "Failed to update team", isLoading: false });
      console.error("Error updating team:", error);
    }
  },
  deleteMatch: async (id: number) => {
    try {
      set({ isLoading: true });
      await axios.delete(`${baseUrl}/matches/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      });
      set((state) => ({
        matches: state.matches.filter((match) => match.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: "Failed to delete team", isLoading: false });
      console.error("Error deleting team:", error);
    }
  },
}));
