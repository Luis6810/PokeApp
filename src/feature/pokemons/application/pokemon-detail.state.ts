import { create } from "zustand";
import { PokemonDTO } from "../models/pokemon-detail.dto";
import PokemonService from "../api/pokemon.service";

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

      const pokemon = await PokemonService.GetPokemonById(id);

      set({ pokemon });
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
