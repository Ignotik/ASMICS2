import { create } from "zustand";
import type { Tournament } from "../types/tournament";
import { baseUrl } from "../consts/url-backend";

interface TournamentStore {
  tournaments: Tournament[];
  isLoading: boolean;
  error: string | null;
  fetchTournaments: () => Promise<void>;
  createTournament: (formData: FormData) => Promise<void>;
  deleteTournament: (id: number) => Promise<void>;
  updateTournament: (id: number, data: Tournament) => Promise<void>;
  fetchTournamentById: (id: number) => Promise<void>;
}

export const useTournamentStore = create<TournamentStore>((set) => ({
  tournaments: [],
  isLoading: false,
  error: null,
  fetchTournaments: async () => {
    try {
      set({ isLoading: true });
      const response = await fetch(`${baseUrl}/tournaments`);
      const data = await response.json();
      set({ tournaments: data, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch tournaments", isLoading: false });
      console.error("Error fetching tournaments:", error);
    }
  },
  createTournament: async (formData) => {
    try {
      set({ isLoading: true });
      const response = await fetch(`${baseUrl}/tournaments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: formData,
      });
      const tournament = await response.json();
      set((state) => ({
        tournaments: [...state.tournaments, tournament],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: "Failed to create tournament", isLoading: false });
      console.error("Error creating tournament:", error);
    }
  },
  deleteTournament: async (id: number) => {
    try {
      set({ isLoading: true });
      await fetch(`${baseUrl}/tournaments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      set((state) => ({
        tournaments: state.tournaments.filter(
          (tournament) => tournament.id !== id
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: "Failed to delete tournament", isLoading: false });
      console.error("Error deleting tournament:", error);
    }
  },
  updateTournament: async (id: number, data: Tournament) => {
    try {
      set({ isLoading: true });
      await fetch(`${baseUrl}/tournaments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      set((state) => ({
        tournaments: state.tournaments.map((tournament) =>
          tournament.id === id ? data : tournament
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: "Failed to update tournament", isLoading: false });
      console.error("Error updating tournament:", error);
    }
  },
  fetchTournamentById: async (id: number) => {
    try {
      set({ isLoading: true });
      const response = await fetch(`${baseUrl}/tournaments/${id}`);
      const tournament = await response.json();
      set({ tournaments: [tournament], isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch tournament", isLoading: false });
      console.error("Error fetching tournament:", error);
    }
  },
}));
