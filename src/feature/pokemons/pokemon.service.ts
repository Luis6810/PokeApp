import ClientApi from "../../shared/client.api";
import { PokemonDTO } from "../pokemon-detail/pokemon-detail.dto";
import { PokemonData, PokemonResponse } from "./models/pokemon-list..dto";
import { PokemonTypesDTO } from "./models/pokemon-types.dto";
import { Result } from "./models/types.dto";

const PokemonService = {

    async GetPokemons(offset : number, limit : number ): Promise<PokemonData[]> {
      let response = await ClientApi.get<PokemonResponse>("/pokemon?offset=" + offset + "&limit=" + limit);
      return response.data.results;
    },

  async GetTypes(): Promise<Result[]> {
    const response = await ClientApi.get("/type");
    return response.data.results;
  },

  async GetPokemonsByType(type: string): Promise<PokemonTypesDTO> {
    const response = await ClientApi.get("/type/"+ type);
    return response.data;
  }
}
export default PokemonService;

