import { Text, ScrollView, Pressable, ActivityIndicator, View } from "react-native";
import { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { usePokemonDetailState } from "./pokemon-detail.state";
import styles from "../pokemon-detail/pokemon-detail.style";
import { useFavorites } from "../favorites";
import FastImage from "react-native-fast-image";

export default function PokemonDetailScreen() {
  const route = useRoute<any>();
  const { url } = route.params;
  const { toggleFavorite, isFavorite } = useFavorites();

  const { pokemon, isLoading, error, loadPokemonByUrl, clear } = usePokemonDetailState();

  useEffect(() => {
    loadPokemonByUrl(url);
    return clear;
  }, [url]);

  if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>{error}</Text>;
  if (!pokemon) return null;

  const image =
    pokemon.sprites.other?.["official-artwork"]?.front_default ??
    pokemon.sprites.front_default;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.name}>{pokemon.name}</Text>

      {image && (
        <View style={styles.imageContainer}>
          <FastImage source={{ uri: image }} style={styles.image} resizeMode={FastImage.resizeMode.contain} />
        </View>
      )}

      <Pressable
        style={styles.favoriteButton}
        onPress={() => toggleFavorite({ image, name: pokemon.name, id: pokemon.id, url })}
      >
        <Text style={styles.favoriteText}>{isFavorite(pokemon.id) ? "★" : "☆"}</Text>
      </Pressable>

      <Text style={styles.sectionTitle}>Types</Text>
      <View style={styles.badgesContainer}>
        {pokemon.types.map((t) => (
          <View key={t.slot} style={styles.badge}>
            <Text style={styles.badgeText}>{t.type.name}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Abilities</Text>
      <View style={styles.badgesContainer}>
        {pokemon.abilities.map((a, i) => (
          <View key={i} style={styles.badge}>
            <Text style={styles.badgeText}>
              {a.ability?.name}
              {a.is_hidden ? " (Hidden)" : ""}
            </Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Stats</Text>
      {pokemon.stats.map((s) => (
        <View key={s.stat.name} style={styles.statRow}>
          <Text style={styles.statText}>{s.stat.name}</Text>
          <Text style={styles.statText}>{s.base_stat}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
