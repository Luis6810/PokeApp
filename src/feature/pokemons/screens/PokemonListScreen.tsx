import { useEffect } from "react";
import { Text, FlatList, Pressable } from "react-native";
import { usePokemonStore } from "../application/pokemon.state";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/pokemon.style";
import { Routes } from "../../../shared/navigation/routes";

const PokemonsScreen = () => {
  const {
    pokemons,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    error,
    loadInitial,
    loadNextPage,
  } = usePokemonStore();

  const navigation = useNavigation<any>();


  useEffect(() => {
    loadInitial();
  }, []);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <>
      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.url.toString()}
        renderItem={({ item }) => {
          return (
            <Pressable
              style={styles.card}
              onPress={() =>
                navigation.navigate(Routes.PokemonDetail, {
                  url: item.url,
                })
              }
              // activeOpacity={0.7}
            >
              <Text style={styles.name}>{item.name}</Text>
            </Pressable>
          );
        }}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            loadNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingNextPage ? <Text>Loading more...</Text> : null} /></>
  );
};

export default PokemonsScreen;
