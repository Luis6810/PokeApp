import { useEffect } from "react";
import { Text, FlatList, Pressable, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../shared/navigation/routes";
import { useMovesStore } from "./moves.state";
import MovesStyles from "./moves.styles";

const MovesScreen = () => {
  const navigation = useNavigation<any>();

  const {
    moves,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    error,
    loadInitial,
    loadNextPage,
  } = useMovesStore();

  // Load initial moves
  useEffect(() => {
    loadInitial();
  }, []);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={moves}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <Pressable
            style={MovesStyles.card}
            // onPress={() =>
            //   navigation.navigate(Routes.MoveDetail, { url: item.url })
            // }
          >
            <Text style={MovesStyles.name}>{item.name}</Text>
          </Pressable>
        )}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            loadNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? <Text>Loading more...</Text> : null
        }
      />
    </View>
  );
};

export default MovesScreen;
