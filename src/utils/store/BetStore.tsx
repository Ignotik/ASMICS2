import { create } from "zustand";
import type { Bet, BetCreate } from "../types/bet";
import { baseUrl } from "../consts/url-backend";
import axios from "axios";

interface BetStore {
  bets: Bet[];
  betCreate: BetCreate;
  createBet: (bet: BetCreate, matchId: number) => void;
  isLoading: boolean;
  error: string | null;
}

export const useBetStore = create<BetStore>((set) => ({
  bets: [],
  betCreate: {
    userId: 0,
    team: 0,
    amount: 0,
  },
  isLoading: false,
  error: null,
  createBet: async (bet: BetCreate, matchId: number) => {
    try {
      set({ isLoading: true });
      const response = await axios.post<BetCreate>(
        `${baseUrl}/matches/${matchId}/bet`,
        bet,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      set({ error: "Failed to create team", isLoading: false });
      console.error("Error creating team:", error);
    }
  },
}));
