import {Handler} from "express";
import {ApiError} from "../utils/utils";
import config from "config";

const AuthService = new (require('services/AuthService'))()

export const authenticateUser: Handler = async (req, res) => {
  const authHeader = req.header('Authorization');
  if(!authHeader || authHeader.indexOf('Basic ') === -1) {
    throw new ApiError(401, 'Invalid credentials provided');
  }
  const base64Credentials = authHeader.split(' ')[1];
  const [user, pass] = atob(base64Credentials).split(':');

  const token = await AuthService.authenticateUser(user, pass);
  res.cookie('jwt', token, {httpOnly: true, sameSite: 'lax'})
  return res.status(200).send();
}