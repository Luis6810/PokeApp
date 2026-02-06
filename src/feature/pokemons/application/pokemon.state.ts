import { create } from "zustand";
import {PokemonData} from "../models/pokemon-list..dto";
import PokemonService from "../api/pokemon.service";

const PAGE_SIZE = 20;

type PokemonState = {
  pokemons: PokemonData[];
  page: number;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  error: string | null;

  loadInitial: () => Promise<void>;
  loadNextPage: () => Promise<void>;
};

export const usePokemonStore = create<PokemonState>((set, get) => ({
  pokemons: [],
  page: 0,
  isLoading: false,
  isFetchingNextPage: false,
  hasNextPage: true,
  error: null,

  loadInitial: async () => {
    set({ isLoading: true, error: null });

    try {
      const data = await PokemonService.GetPokemons(0, PAGE_SIZE);

      set({
        pokemons: data,
        page: 1,
        hasNextPage: data.length === PAGE_SIZE,
      });
    } catch (e) {
      set({ error: "Failed to load pokemons" });
    } finally {
      set({ isLoading: false });
    }
  },

  loadNextPage: async () => {
    const { page, hasNextPage, isFetchingNextPage } = get();
    if (!hasNextPage || isFetchingNextPage) return;

    set({ isFetchingNextPage: true });

    try {
      const data = await PokemonService.GetPokemons(
        page * PAGE_SIZE,
        PAGE_SIZE
      );

      set((state) => ({
        pokemons: [...state.pokemons, ...data],
        page: state.page + 1,
        hasNextPage: data.length === PAGE_SIZE,
      }));
    } catch (e) {
      set({ error: "Failed to load more pokemons" });
    } finally {
      set({ isFetchingNextPage: false });
    }
  },
}));
