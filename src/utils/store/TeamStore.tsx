import { create } from "zustand";
import axios from "axios";
import { baseUrl } from "../consts/url-backend";

interface Team {
  id: number;
  name: string;
  icon_path: string;
}

interface TeamStore {
  createTeam: (formData: FormData) => void;
  updateTeam: (id: number, formData: FormData) => void;
  deleteTeam: (id: number) => void;
  fetchTeams: () => void;
  fetchTeamById: (id: number) => void;
  teams: Team[];
  team: Team | null;
  isLoading: boolean;
  error: string | null;
}

export const useTeamStore = create<TeamStore>((set) => ({
  teams: [],
  team: null,
  isLoading: false,
  error: null,
  fetchTeams: async () => {
    try {
      set({ isLoading: true });

      const response = await axios.get(`${baseUrl}/teams`);
      const teams = await response.data;
      set({ teams, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch teams", isLoading: false });
      console.error("Error fetching teams:", error);
    }
  },
  fetchTeamById: async (id: number) => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`${baseUrl}/teams/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const team = await response.data;
      set({ teams: [team], isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch team", isLoading: false });
      console.error("Error fetching team:", error);
    }
  },
  createTeam: async (formData) => {
    try {
      set({ isLoading: true });
      const response = await axios.post<Team>(`${baseUrl}/teams`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      set((state) => ({
        teams: [...state.teams, response.data],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: "Failed to create team", isLoading: false });
      console.error("Error creating team:", error);
    }
  },
  updateTeam: async (id: number, formData) => {
    try {
      set({ isLoading: true });
      const response = await axios.patch<Team>(
        `${baseUrl}/teams/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      set((state) => ({
        teams: state.teams.map((team) =>
          team.id === id ? response.data : team
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: "Failed to update team", isLoading: false });
      console.error("Error updating team:", error);
    }
  },
  deleteTeam: async (id: number) => {
    try {
      set({ isLoading: true });
      await axios.delete(`${baseUrl}/teams/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      set((state) => ({
        teams: state.teams.filter((team) => team.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: "Failed to delete team", isLoading: false });
      console.error("Error deleting team:", error);
    }
  },
}));
