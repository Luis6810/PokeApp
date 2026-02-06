import {
  Text,
  FlatList,
  Pressable,
  Image,
  StyleSheet,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { usePokemonFavoritesState } from "./favorites.state";
import { Routes } from "../../shared/navigation/routes";
import FastImage from "react-native-fast-image";
import { useEffect } from "react";
import stylesFavorites from "./favorites.styles";


export default function FavoritesScreen() {
  const navigation = useNavigation<any>();
  const { favorites, loadFavorites } = usePokemonFavoritesState();

  useEffect(() => {
    loadFavorites();
  }, []);

  if (favorites.length === 0) {
    return (
      <View style={stylesFavorites.emptyContainer}>
        <Text style={stylesFavorites.emptyText}>No favorite Pokémon yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={stylesFavorites.list}
      renderItem={({ item }) => (
        <Pressable
          style={({ pressed }) => [
            stylesFavorites.card,
            pressed && stylesFavorites.cardPressed,
          ]}
          // onPress={() =>
          //   navigation.navigate(Routes.PokemonDetail, {
          //     url: item.url,
          //   })
          // }
        >
          {item.image && (
            <FastImage
              source={{ uri: item.image }}
              style={stylesFavorites.image}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}

          <View style={stylesFavorites.textContainer}>
            <Text style={stylesFavorites.name}>
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </Text>
            <Text style={stylesFavorites.subtitle}>Favorite Pokémon</Text>
          </View>
        </Pressable>
      )}
    />
  );
}
