export interface TypesDTO {
    count:    number;
    next:     string;
    previous: null;
    results:  Result[];
}

export interface Result {
    name: string;
    url:  string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toTypesDTO(json: string): TypesDTO {
        return JSON.parse(json);
    }

    public static typesDTOToJson(value: TypesDTO): string {
        return JSON.stringify(value);
    }
}
