import ClientApi from "../../shared/client.api";
import { MovesDTO } from "./move-detail.dto";

const MovesService = {

  async GetMoveById(id: number): Promise<MovesDTO> {
    let response = await ClientApi.get<MovesDTO>(`/move/${id}`);
    return response.data;
  }
}
export default MovesService;

