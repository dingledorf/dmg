import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiString from 'chai-string';
import chaiSubset from 'chai-subset';
import 'chai/register-expect.js';
import sinonChai from 'sinon-chai';
const sinon = require('sinon');

chai.use(chaiSubset);
chai.use(sinonChai);
chai.use(chaiString);
chai.use(chaiAsPromised);
const cache = require('../cache');

export const mochaHooks = {
  async afterEach() {
    sinon.restore();
    cache.flushAll();
  }
};