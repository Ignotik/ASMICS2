import { create } from "zustand";
import axios from "axios";
import common from "../../assets/COMMON.jpg";
import { baseUrl } from "../consts/url-backend";

export interface Card {
  id: number;
  image: string;
  name: string;
  rarity: string;
  weight: number;
  description: string[];
}

interface CardsStore {
  cards: Card[];
  isLoading: boolean;
  error: string | null;
  fetchAllCards: () => Promise<void>;
  fetchRandomCard: () => Promise<Card>;
}

export const useCardsStore = create<CardsStore>((set) => ({
  cards: [],
  isLoading: false,
  error: null,

  fetchAllCards: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get<Card[]>(`${baseUrl}/get-all-cards`);
      set({ cards: response.data, isLoading: false });
    } catch (error) {
      console.error("Error fetching all cards:", error);
      set({ error: "Failed to load cards", isLoading: false });
    }
  },

  fetchRandomCard: async () => {
    try {
      const response = await axios.get<Card>(`${baseUrl}/get-random-card`);
      return response.data;
    } catch (error) {
      console.error("Error fetching random card:", error);
      return {
        id: 0,
        image: common,
        name: "Обычная карта (fallback)",
        rarity: "common",
        description: ["Default description"],
        weight: 20,
      };
    }
  },
}));
