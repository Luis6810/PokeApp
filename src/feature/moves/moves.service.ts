import ClientApi from "../../shared/client.api";
import { PokemonDTO } from "../pokemon-detail/pokemon-detail.dto";
import { Move, MovesDTO } from "./move.dto";

const MovesService = {

async GetMoves(offset : number, limit : number ): Promise<Move[]> {
    let response = await ClientApi.get<MovesDTO>(`/move?offset=${offset}&limit=${limit}`);
    return response.data.results;
}
}
export default MovesService;

