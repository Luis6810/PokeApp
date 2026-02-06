import { useEffect } from "react";
import {
  Text,
  FlatList,
  Pressable,
  TextInput,
  View,
  Button,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./pokemon.style";
import { Routes } from "../../shared/navigation/routes";
import { PokemonData, usePokemonStore } from "./pokemon.state";

const PokemonsScreen = () => {
  const navigation = useNavigation<any>();

  const {
    error,
    pokemons,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    searchText,
    debouncedSearch,
    typeFilter,
    setSearchText,
    setTypeFilter,
    loadInitial,
    loadNextPage,
    loadByType,
    loadTypes,
    categories,
  } = usePokemonStore();

  useEffect(() => {
    loadTypes();
    loadInitial();
  }, []);

  const filteredPokemons: PokemonData[] = debouncedSearch
    ? pokemons.filter(p => p.name.toLowerCase().includes(debouncedSearch))
    : pokemons;

  useEffect(() => {
    if (debouncedSearch && filteredPokemons.length === 0 && hasNextPage && !isFetchingNextPage) {
      loadNextPage();
    }
  }, [debouncedSearch, filteredPokemons, hasNextPage, isFetchingNextPage]);

  if (error) return <Text>{error}</Text>;

  return (
    <View style={{ flex: 1 }}>
      {/* Search input */}
      <TextInput
        placeholder="Search Pokémon..."
        value={searchText}
        onChangeText={setSearchText}
        style={{
          padding: 10,
          margin: 10,
          borderWidth: 1,
          borderRadius: 8,
        }}
      />
      {/* Type filter */}
      <ScrollView
        style={{ minHeight: 58}}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", paddingVertical: 10 }}
      >
        {categories.map((t) => (
          <Pressable
            key={t.name}
            onPress={() => loadByType(t.name)}
            style={{
              paddingVertical: 6,
              paddingHorizontal: 12,
              borderRadius: 20,
              margin: 4,
              backgroundColor: typeFilter === t.name ? "orange" : "#ddd",
              minWidth: 80,
              alignItems: "center",
            }}
          >
            <Text style={{ color: typeFilter === t.name ? "white" : "#333", fontWeight: "bold" }}>
              {t.name.toUpperCase()}
            </Text>
          </Pressable>
        ))}

        <Pressable
          onPress={loadInitial}
          style={{
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 20,
            margin: 4,
            backgroundColor: typeFilter ? "#ddd" : "orange",
            minWidth: 80,
            alignItems: "center",
          }}
        >
          <Text style={{ color: typeFilter ? "#333" : "white", fontWeight: "bold" }}>ALL</Text>
        </Pressable>
      </ScrollView>

      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
        

      {/* Pokémon list */}
      <FlatList
        data={filteredPokemons}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate(Routes.PokemonDetail, { url: item.url })}
          >
            <Text style={styles.name}>{item.name}</Text>
          </Pressable>
        )}
        onEndReached={() => {
          if (!debouncedSearch && !typeFilter && hasNextPage && !isFetchingNextPage) {
            loadNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetchingNextPage ? <Text>Loading more...</Text> : null}
      />
    </View>
  );
};

export default PokemonsScreen;
