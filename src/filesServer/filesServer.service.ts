import api from "../libs/api/api.service";
import { FILES_SERVER_URL } from "./filesServer.consts";

const fetchFiles = async () => {
  const response: { data: {} } = await api.get(FILES_SERVER_URL);
  return response.data;
};

export { fetchFiles };
