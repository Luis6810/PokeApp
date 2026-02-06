import PokemonsScreen from "../../feature/pokemons/PokemonListScreen";
import PokemonDetailScreen from "../../feature/pokemon-detail/PokemonDetailScreen";
import { Routes } from "./routes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function PokemonStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.PokemonList}
        component={PokemonsScreen}
        options={{ title: "Pokemons" }}
      />
      <Stack.Screen
        name={Routes.PokemonDetail}
        component={PokemonDetailScreen}
        options={{ title: "Pokemon Detail" }}
      />
    </Stack.Navigator>
  );
}
