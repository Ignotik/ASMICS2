import axios from "axios";
import { create } from "zustand";
import { baseUrl } from "../consts/url-backend";
import type { CardCollection } from "../types/cards";

interface CardPackState {
  cardCollections: CardCollection[];
  isLoading: boolean;
  error: string | null;
  createCardCollection: (data: CardCollection) => Promise<void>;
  fetchCardCollections: () => Promise<void>;
}

export const useCardPackStore = create<CardPackState>((set) => ({
  cardCollections: [],
  isLoading: false,
  error: null,

  createCardCollection: async (data: CardCollection) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${baseUrl}/card-collections`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      set((state) => ({
        cardCollections: [...state.cardCollections, response.data],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: "Failed to create card collection", isLoading: false });
      console.error("Error creating card collection:", error);
    }
  },

  fetchCardCollections: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${baseUrl}/card-collections`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      set({ cardCollections: response.data, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch card collections", isLoading: false });
      console.error("Error fetching card collections:", error);
    }
  },
}));
