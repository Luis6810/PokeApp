import ClientApi from "../../../shared/client.api";
import { PokemonDTO } from "../models/pokemon-detail.dto";
import { PokemonData, PokemonResponse } from "../models/pokemon-list..dto";

const PokemonService = {

  async GetPokemons(offset : number, limit : number ): Promise<PokemonData[]> {
    let response = await ClientApi.get<PokemonResponse>("/pokemon?offset=" + offset + "&limit=" + limit);
    return response.data.results;
  },

  async GetPokemonById(id: number): Promise<PokemonDTO> {
    let response = await ClientApi.get<PokemonDTO>(`/pokemon/${id}`);
    return response.data;
  }
}
export default PokemonService;

