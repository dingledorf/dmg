import * as StatsController from 'controllers/StatsController'
import * as fetch from 'node-fetch';
import {json} from "../tests/express";
import {Response} from "node-fetch";
const StatsService = require('services/StatsService');
const sinon = require("sinon");
const cache = require('./../cache');
const fs = require('fs');

describe('StatsController', () => {
  describe('getStatistics',  () => {
    it('calls apis if not cached', async () => {
      const fetchStub = sinon.stub(fetch, 'default')
      fetchStub.onCall(0).returns(new Promise((resolve) => resolve(new Response('{"time":{"updated":"Nov 3, 2023 23:08:00 UTC","updatedISO":"2023-11-03T23:08:00+00:00","updateduk":"Nov 3, 2023 at 23:08 GMT"},"disclaimer":"This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org","chartName":"Bitcoin","bpi":{"USD":{"code":"USD","symbol":"&#36;","rate":"34,665.0362","description":"United States Dollar","rate_float":34665.0362},"GBP":{"code":"GBP","symbol":"&pound;","rate":"28,965.8269","description":"British Pound Sterling","rate_float":28965.8269},"EUR":{"code":"EUR","symbol":"&euro;","rate":"33,768.8063","description":"Euro","rate_float":33768.8063}}}', { status: 200 }))))
      fetchStub.onCall(1).returns(new Promise((resolve) => resolve(new Response('6.2463471666732E13', { status: 200 }))))
      const fsStub = sinon.stub(fs, 'readFileSync');
      fsStub.onFirstCall().returns('[{"id":1,"name":"Antminer S2","location":"Mining Facility C","hashRate":"95.473375856326211 TH/S"},{"id":2,"name":"Antminer S2","location":"Mining Facility A","hashRate":"63.124653604061336 TH/S"},{"id":3,"name":"Antminer S3","location":"Mining Facility B","hashRate":"150.0160810465253 TH/S"},{"id":4,"name":"Antminer S4","location":"Mining Facility C","hashRate":"129.9991929861352 TH/S"}]');
      fsStub.onSecondCall().returns('{"totalHashRate": 1245.4265974589805,"activeMiners": 46,"miningRevenue": 8930.862364781207}');
      const resp = await json(StatsController.getStatistics);
      expect(fetchStub).to.have.been.calledTwice;
      expect(fsStub).to.have.been.calledTwice;
      expect(resp.activeMiners).to.eq(4);
      expect(resp.bitcoinPrice).to.eq(34665.0362);
      expect(resp.miningDifficulty).to.eq("6.2463471666732E13");
    });
    it('uses cache if api is cached', async () => {
      cache.set(StatsService.BITCOIN_PRICE_CACHE_KEY, '995.0362');
      cache.set(StatsService.DIFFICULTY_CACHE_KEY, '6.2463471666732E13');
      const fetchStub = sinon.stub(fetch, 'default')
      const fsStub = sinon.stub(fs, 'readFileSync');
      fsStub.onFirstCall().returns('[{"id":1,"name":"Antminer S2","location":"Mining Facility C","hashRate":"95.473375856326211 TH/S"},{"id":2,"name":"Antminer S2","location":"Mining Facility A","hashRate":"63.124653604061336 TH/S"},{"id":3,"name":"Antminer S3","location":"Mining Facility B","hashRate":"150.0160810465253 TH/S"},{"id":4,"name":"Antminer S4","location":"Mining Facility C","hashRate":"129.9991929861352 TH/S"}]');
      fsStub.onSecondCall().returns('{"totalHashRate": 1245.4265974589805,"activeMiners": 46,"miningRevenue": 8930.862364781207}');
      const resp = await json(StatsController.getStatistics);
      expect(fetchStub).to.have.not.been.called;
      expect(fsStub).to.have.been.calledTwice;
      expect(resp.activeMiners).to.eq(4);
      expect(resp.bitcoinPrice).to.eq(995.0362);
      expect(resp.miningDifficulty).to.eq("6.2463471666732E13");
    })
  })
})