import AsyncStorage from "@react-native-async-storage/async-storage";
import { PokemonFavoriteCached } from "./favorite-storage.dto";

const STORAGE_KEY = "pokemon_favorites";

export const PokemonFavoritesStorage = {
  async load(): Promise<PokemonFavoriteCached[]> {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as PokemonFavoriteCached[]) : [];
  },

  async save(favorites: PokemonFavoriteCached[]): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  },
};
