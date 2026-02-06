import { Text, FlatList, Pressable, Image, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { usePokemonFavoritesState } from "./favorites.state";
import { Routes } from "../../shared/navigation/routes";
import FastImage from "react-native-fast-image";
import { useEffect } from "react";

export default function FavoritesScreen() {
  const navigation = useNavigation<any>();
  const { favorites, loadFavorites } = usePokemonFavoritesState();

  useEffect(() => {
    loadFavorites();
  }, []);

  if (favorites.length === 0) {
    return <Text>No favorite Pokémon yet</Text>;
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable
          // onPress={() =>
          //   navigation.navigate(Routes.PokemonDetail, {
          //     url: item.url,
          //   })
          // }
        >
          {item.image && (
            <Image
              source={{ uri: item.image }}
              style={{ width: 80, height: 80 }}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}

          <Text>{item.name}</Text>
        </Pressable>
      )}
    />
  );
}
