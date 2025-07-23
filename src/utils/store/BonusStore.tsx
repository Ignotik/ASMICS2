// stores/bonusStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { baseUrl } from "../consts/url-backend";

interface BonusDay {
  day: number;
  reward: number;
  collected: boolean;
}

interface BonusState {
  bonusDays: BonusDay[];
  lastCollectionDate: string | null;
  currentStreak: number;
  welcomeBonusClaimed: boolean;
  isLoading: boolean;
  error: string | null;
  claimDailyBonus: (userId: number) => Promise<void>;
}

export const useBonusStore = create<BonusState>()(
  persist(
    (set) => ({
      bonusDays: Array.from({ length: 7 }, (_, i) => ({
        day: i + 1,
        reward: 5000,
        collected: false,
      })),
      lastCollectionDate: null,
      currentStreak: 0,
      welcomeBonusClaimed: false,
      isLoading: false,
      error: null,

      claimDailyBonus: async () => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.get(baseUrl + "/bonus", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          });

          const now = new Date().toISOString();

          // Update local state
          set((state) => {
            const newStreak = state.currentStreak + 1;
            const dayIndex = newStreak % 7 || 7; // 1-7 cycle

            return {
              response,
              lastCollectionDate: now,
              currentStreak: newStreak,
              bonusDays: state.bonusDays.map((day, index) =>
                index === dayIndex - 1 ? { ...day, collected: true } : day
              ),
            };
          });
        } catch (error) {
          set({ error: "Failed to claim daily bonus" });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "bonus-storage",
      partialize: (state) => ({
        bonusDays: state.bonusDays,
        lastCollectionDate: state.lastCollectionDate,
        currentStreak: state.currentStreak,
        welcomeBonusClaimed: state.welcomeBonusClaimed,
      }),
    }
  )
);
