import axios from 'helpers/axios';

type Hardware = {
  id: number,
  location: string,
  name: string,
  hashRate: string
}

type CreateOrUpdateRequest = Omit<Hardware, 'id' | 'hashRate'> & { hashRate: number };
type GetRequest = {
  page?: number,
  name?: string,
  location?: string
}
type GetResponse = {
  hardware: Hardware[],
  total: number
}

export const createHardware = async (params: CreateOrUpdateRequest)=> {
  const resp = await axios.post('hardware', params)
  return resp.data as Hardware;
}

export const updateHardware = async (id: number, params: CreateOrUpdateRequest)=> {
  const resp = await axios.put(`hardware/${id}`, params)
  return resp.data as Hardware;
}

export const deleteHardware = async (id: number)=> {
  await axios.delete(`hardware/${id}`)
}

export const getHardware = async (params: GetRequest) => {
  const resp = await axios.get(`hardware`, {params})
  return resp.data as GetResponse;
}

export const findHardware = async (id: number) => {
  const resp = await axios.get(`hardware/${id}`)
  return resp.data as Hardware;
}