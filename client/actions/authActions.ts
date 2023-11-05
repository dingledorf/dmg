import axios from 'helpers/axios';

type AuthenticateRequest = {
  username: string,
  password: string
}

export const authenticate = async (params: AuthenticateRequest)=> {
  const auth = btoa(`${params.username}:${params.password}`)
  await axios.post('auth', null, {headers: {Authorization: `Basic ${auth}`}})
  return true;
}