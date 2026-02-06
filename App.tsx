import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/shared/query.client';
import PokemonStack from './src/shared/navigation/pokemon.stack';
import FavoritesScreen from './src/feature/favorites/FavoriteScreen';
import MovesScreen from './src/feature/moves/MovesScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    // <QueryClientProvider client={queryClient}>
    <NavigationContainer>
        <Tab.Navigator>
       {/* <View> */}
          <Tab.Screen name="Pokemons" component={PokemonStack} options={{ headerShown: false }} />
          <Tab.Screen name="Favorites" component={FavoritesScreen} />
          <Tab.Screen name="Moves" component={MovesScreen} />
       {/* </View> */}
        </Tab.Navigator>
    </NavigationContainer>
    // </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    // margin: 100,
  },
});
