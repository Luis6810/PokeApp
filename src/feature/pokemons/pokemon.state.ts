import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PokemonService from "./pokemon.service";

export type PokemonData = {
  name: string;
  url: string;
};

type PokemonState = {
  pokemons: PokemonData[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  error: string | null;

  searchText: string;
  debouncedSearch: string;
  typeFilter: string | null;

  setSearchText: (text: string) => void;
  setTypeFilter: (type: string | null) => void;

  loadInitial: () => Promise<void>;
  loadNextPage: () => Promise<void>;
  loadByType: (type: string) => Promise<void>;
  loadTypes: () => Promise<void>;
  categories: { name: string; url: string }[];
  cachedTypes: Record<string, PokemonData[]>; 
};

const DEBOUNCE_DELAY = 500;
const STORAGE_KEY = "pokemon_cache";

export const usePokemonStore = create<PokemonState>((set, get) => {
  let debounceTimer: ReturnType<typeof setTimeout>;

  return {
    pokemons: [],
    isLoading: false,
    isFetchingNextPage: false,
    hasNextPage: true,
    error: null,

    categories: [],
    cachedTypes: {},

    searchText: "",
    debouncedSearch: "",
    typeFilter: null,

    setSearchText: (text) => {
      set({ searchText: text });

      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        set({ debouncedSearch: text.trim().toLowerCase() });
      }, DEBOUNCE_DELAY);
    },

    setTypeFilter: (type) => {
      set({ typeFilter: type });
    },

    loadInitial: async () => {
      try {
        set({ isLoading: true, error: null, typeFilter: null });

        const { cachedTypes } = get();
        if (cachedTypes["all"]) {
          set({
            pokemons: cachedTypes["all"],
            isLoading: false,
            hasNextPage: true,
          });
          return;
        }

        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const cached: PokemonData[] = JSON.parse(stored);
          set({
            pokemons: cached,
            isLoading: false,
            hasNextPage: true,
            cachedTypes: { ...cachedTypes, all: cached },
          });
        }

        const data = await PokemonService.GetPokemons(0, 50);
        set((state) => ({
          pokemons: data,
          isLoading: false,
          hasNextPage: data.length === 50,
          cachedTypes: { ...state.cachedTypes, all: data },
        }));

        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (err: any) {
        set({ error: err.message, isLoading: false });
      }
    },

    loadNextPage: async () => {
      const { pokemons, isFetchingNextPage, hasNextPage, typeFilter } = get();
      if (isFetchingNextPage || !hasNextPage || typeFilter) return;

      try {
        set({ isFetchingNextPage: true });
        const nextData = await PokemonService.GetPokemons(pokemons.length, 50);
        const updated = [...pokemons, ...nextData];

        set((state) => ({
          pokemons: updated,
          isFetchingNextPage: false,
          hasNextPage: nextData.length === 50,
          cachedTypes: { ...state.cachedTypes, all: updated },
        }));

        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err: any) {
        set({ error: err.message, isFetchingNextPage: false });
      }
    },

    loadByType: async (type: string) => {
      const { cachedTypes } = get();

      if (cachedTypes[type]) {
        set({ pokemons: cachedTypes[type], typeFilter: type, hasNextPage: false });
        return;
      }

      set({ isLoading: true, typeFilter: type, error: null });

      try {
        const storageKey = `pokemon_cache_type_${type}`;
        const stored = await AsyncStorage.getItem(storageKey);
        if (stored) {
          const cached: PokemonData[] = JSON.parse(stored);
          set((state) => ({
            pokemons: cached,
            cachedTypes: { ...state.cachedTypes, [type]: cached },
            isLoading: false,
            hasNextPage: false,
          }));
          return;
        }

        const data = await PokemonService.GetPokemonsByType(type);
        const pokemonsByType: PokemonData[] = data.pokemon.map((p) => p.pokemon);

        set((state) => ({
          pokemons: pokemonsByType,
          cachedTypes: { ...state.cachedTypes, [type]: pokemonsByType },
          isLoading: false,
          hasNextPage: false,
        }));

        await AsyncStorage.setItem(storageKey, JSON.stringify(pokemonsByType));
      } catch (err: any) {
        set({ error: err.message, isLoading: false });
      }
    },

    loadTypes: async () => {
      try {
        const categories = await PokemonService.GetTypes();
        set({ categories });
      } catch (err: any) {
        set({ error: err.message });
      }
    },
  };
});
