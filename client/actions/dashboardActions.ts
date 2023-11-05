import axios from "helpers/axios";

export const getStatistics = async ()=> {
  const resp = await axios.get('stats');
  return resp.data;
}