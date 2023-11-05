import {ApiError} from "../utils/utils";

const config = require('config');
const jwt = require('jsonwebtoken');

export interface IAuthService {
  authenticateUser: (user: string, pass: string) => Promise<string>
}

class AuthService implements IAuthService {
  async authenticateUser(user: string, pass: string): Promise<string> {
    if(user === config.get('user') && pass === config.get('password')) {
      return jwt.sign({
        user
      }, config.get('jwtSecret'), { expiresIn: '24h' })
    } else {
      throw new ApiError(401, 'Invalid credentials provided.');
    }
  }
}

module.exports = AuthService