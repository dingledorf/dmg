import * as AuthController from 'controllers/AuthController';
const AuthService = require('services/AuthService');
import {request, json} from "../tests/express";
import {ApiError} from "../utils/utils";

const sinon = require("sinon");

describe('AuthController', () => {
  describe('authenticateUser',  () => {
    it('should throw a 401 error if header not provided', async () => {
      try {
        await request(AuthController.authenticateUser)
      } catch (err: any) {
        expect(err.status).to.eq(401);
        expect(err.inner).to.include('Invalid credentials provided')
      }
    })
    it('should throw a 401 error if incorrect header format provided', async () => {
      try {
        await request(AuthController.authenticateUser, {headers: {'Authorization': 'Bearer xyz'}})
      } catch (err: any) {
        expect(err.status).to.eq(401);
        expect(err.inner).to.include('Invalid credentials provided')
      }
    })
    it('should throw a 401 error if invalid credentials', async () => {
      const stub = sinon.stub(AuthService.prototype, 'authenticateUser').throws(new ApiError(401, 'Invalid credentials provided'));
      try {
        await request(AuthController.authenticateUser, {headers: {'Authorization': 'Basic xyz'}})
      } catch (err: any) {
        expect(stub).to.have.been.called;
        expect(err.status).to.eq(401);
        expect(err.inner).to.include('Invalid credentials provided')
      }
    })
    it('should return a cookie with jwt if valid credentials', async () => {
      const resp = await request(AuthController.authenticateUser, {headers: {'Authorization': 'Basic ZG1nOmRtZ1Rlc3Q='}})
      expect(resp.cookies.jwt).to.exist
    })
  })
})