import { create } from "zustand";
import { PokemonFavoritesStorage as PokemonFavoritesService } from "./favorites.service";
import { PokemonFavoriteCached } from "./favorite-storage.dto";

type FavoritesState = {
  favorites: PokemonFavoriteCached[];

  loadFavorites: () => Promise<void>;
  toggleFavorite: (pokemon: PokemonFavoriteCached) => Promise<void>;
  isFavorite: (id: number) => boolean;
};

export const usePokemonFavoritesState = create<FavoritesState>((set, get) => ({
  favorites: [],

  async loadFavorites() {
    const favorites = await PokemonFavoritesService.load();
    set({ favorites });
  },

  async toggleFavorite(pokemon) {
    const current = get().favorites;

    const exists = current.some((f) => f.id === pokemon.id);

    const updated = exists
      ? current.filter((f) => f.id !== pokemon.id)
      : [...current, pokemon];

    set({ favorites: updated });
    await PokemonFavoritesService.save(updated);
  },

  isFavorite(id) {
    return get().favorites.some((f) => f.id === id);
  },
}));
