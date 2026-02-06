import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PokemonDTO } from "./pokemon-detail.dto";
import PokemonService from "./podemon-detailo.service";

const STORAGE_KEY_PREFIX = "pokemon_detail_";

type PokemonDetailState = {
  pokemon: PokemonDTO | null;
  isLoading: boolean;
  error: string | null;

  loadPokemonByUrl: (url: string) => Promise<void>;
  clear: () => void;
};

export const usePokemonDetailState = create<PokemonDetailState>((set) => ({
  pokemon: null,
  isLoading: false,
  error: null,

  async loadPokemonByUrl(url: string) {
    try {
      set({ isLoading: true, error: null });

      const id = Number(url.split("/").filter(Boolean).pop());
      const storageKey = `${STORAGE_KEY_PREFIX}${id}`;

      const cached = await AsyncStorage.getItem(storageKey);
      if (cached) {
        const cachedPokemon: PokemonDTO = JSON.parse(cached);
        set({ pokemon: cachedPokemon });
      }

      const pokemon = await PokemonService.GetPokemonById(id);
      set({ pokemon });

      await AsyncStorage.setItem(storageKey, JSON.stringify(pokemon));
    } catch (e) {
      set({ error: "Failed to load Pokémon" });
    } finally {
      set({ isLoading: false });
    }
  },

  clear() {
    set({ pokemon: null, error: null });
  },
}));
