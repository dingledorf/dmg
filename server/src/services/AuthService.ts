import {ApiError} from "../utils/utils";

const jwt = require('jsonwebtoken');

export interface IAuthService {
  authenticateUser: (user: string, pass: string) => Promise<string>
}

class AuthService implements IAuthService {
  async authenticateUser(user: string, pass: string): Promise<string> {
    if(user === process.env.AUTH_USER && pass === process.env.AUTH_PASSWORD) {
      return jwt.sign({
        user
      }, process.env.HMAC_SECRET, { expiresIn: '24h' })
    } else {
      throw new ApiError(401, 'Invalid credentials provided.');
    }
  }
}

module.exports = AuthService