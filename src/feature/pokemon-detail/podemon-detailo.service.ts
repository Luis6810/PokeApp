import ClientApi from "../../shared/client.api";
import { PokemonDTO } from "./pokemon-detail.dto";

const PokemonService = {


  async GetPokemonById(id: number): Promise<PokemonDTO> {
    let response = await ClientApi.get<PokemonDTO>(`/pokemon/${id}`);
    return response.data;
  },

}
export default PokemonService;

    