export interface MovesDTO {
    count:    number;
    next:     string;
    previous: null;
    results:  Move[];
}

export interface Move {
    name: string;
    url:  string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toMovesDTO(json: string): MovesDTO {
        return JSON.parse(json);
    }

    public static movesDTOToJson(value: MovesDTO): string {
        return JSON.stringify(value);
    }
}
