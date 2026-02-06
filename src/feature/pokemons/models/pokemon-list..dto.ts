export interface PokemonResponse {
    count:    number;
    next:     string;
    previous: null;
    results:  PokemonData[];
}

export interface PokemonData {
    name: string;
    url:  string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toPokemonResponse(json: string): PokemonResponse {
        return JSON.parse(json);
    }

    public static pokemonResponseToJson(value: PokemonResponse): string {
        return JSON.stringify(value);
    }
}
