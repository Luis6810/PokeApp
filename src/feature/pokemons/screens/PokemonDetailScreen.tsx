import { Text, Image, ScrollView, Pressable } from "react-native";
import { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { usePokemonDetailState } from "../application/pokemon-detail.state";
import styles from "../styles/pokemon.style";
import { useFavorites } from "../../favorites";
import FastImage from "react-native-fast-image";

export default function PokemonDetailScreen() {
    const route = useRoute<any>();
    const { url } = route.params;
    const { toggleFavorite, isFavorite } = useFavorites();
    
    const {
        pokemon,
        isLoading,
        error,
        loadPokemonByUrl,
        clear,
    } = usePokemonDetailState();

    useEffect(() => {
        loadPokemonByUrl(url);
        return clear;
    }, [url]);

    if (isLoading) return <Text>Loading...</Text>;
    if (error) return <Text>{error}</Text>;
    if (!pokemon) return null;

    const image =
        pokemon.sprites.other?.["official-artwork"]?.front_default ??
        pokemon.sprites.front_default;

    return (
        <ScrollView>
            <Text>{pokemon.name.toUpperCase()}</Text>

            {image && (
                <Image source={{ uri: image }} style={{ width: 200, height: 200 }} resizeMode={FastImage.resizeMode.contain} />
            )}

            <Pressable
                style={styles.favoriteButton}
                onPress={() => toggleFavorite({image: image, name: pokemon.name, id: pokemon.id, url})}
            >
                <Text style={styles.favoriteText}>
                    {isFavorite(pokemon.id) ? "★" : "☆"}
                </Text>
            </Pressable>

            <Text>Types</Text>
            {pokemon.types.map((t) => (
                <Text key={t.slot}>{t.type.name}</Text>
            ))}

            <Text>Abilities</Text>
            {pokemon.abilities.map((a, i) => (
                <Text key={i}>
                    {a.ability?.name}
                    {a.is_hidden ? " (Hidden)" : ""}
                </Text>
            ))}

            <Text>Stats</Text>
            {pokemon.stats.map((s) => (
                <Text key={s.stat.name}>
                    {s.stat.name}: {s.base_stat}
                </Text>
            ))}
        </ScrollView>
    );
}
