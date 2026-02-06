import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MovesService from "./moves.service";

export type MoveData = {
  name: string;
  url: string;
};

type MovesState = {
  moves: MoveData[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  error: string | null;

  loadInitial: () => Promise<void>;
  loadNextPage: () => Promise<void>;
};

const STORAGE_KEY = "moves_cache";
const PAGE_SIZE = 50;

export const useMovesStore = create<MovesState>((set, get) => ({
  moves: [],
  isLoading: false,
  isFetchingNextPage: false,
  hasNextPage: true,
  error: null,

  loadInitial: async () => {
    try {
      set({ isLoading: true, error: null });

      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        set({ moves: JSON.parse(stored) as MoveData[] });
      }

      const data = await MovesService.GetMoves(0, PAGE_SIZE);
      set({
        moves: data,
        hasNextPage: data.length === PAGE_SIZE,
      });

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err: any) {
      set({ error: err.message || "Failed to load moves" });
    } finally {
      set({ isLoading: false });
    }
  },

  loadNextPage: async () => {
    const { moves, isFetchingNextPage, hasNextPage } = get();
    if (isFetchingNextPage || !hasNextPage) return;

    try {
      set({ isFetchingNextPage: true });
      const nextData = await MovesService.GetMoves(moves.length, PAGE_SIZE);

      const updatedMoves = [...moves, ...nextData];

      set({
        moves: updatedMoves,
        isFetchingNextPage: false,
        hasNextPage: nextData.length === PAGE_SIZE,
      });

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMoves));
    } catch (err: any) {
      set({ error: err.message || "Failed to load more moves", isFetchingNextPage: false });
    }
  },
}));
