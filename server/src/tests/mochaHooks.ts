require('dotenv').config({ path: `.env.${process.env.APP_ENV}` })

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiString from 'chai-string';
import chaiSubset from 'chai-subset';
import 'chai/register-expect.js';
import sinonChai from 'sinon-chai';
import dataSource from "../data-source";
const sinon = require('sinon');

chai.use(chaiSubset);
chai.use(sinonChai);
chai.use(chaiString);
chai.use(chaiAsPromised);
const cache = require('../cache');

if (process.env.APP_ENV !== 'test') {
  throw new Error(`Expected APP_ENV "test"`);
}

export const mochaHooks = {
  async beforeAll() {
    await dataSource.initialize();
    if (await dataSource.showMigrations()) {
      throw new Error(
        'Need to run pending migrations: "npm run migration:up"',
      );
    }
  },
  async afterEach() {
    sinon.restore();
    cache.flushAll();
    dataSource.queryResultCache?.clear();
    await clearDb();
  },
  async afterAll() {
    await dataSource.destroy()
  },
};

const clearDb = async () => {
  const tableNames = [
    ...new Set(dataSource.entityMetadatas.map((v) => v.tableName)),
  ];
  await dataSource.query(
    tableNames
      .map(
        (tableName: string) => `ALTER TABLE ${tableName} DISABLE TRIGGER ALL;`,
      )
      .join('') +
    tableNames
      .map((tableName: string) => `DELETE FROM ${tableName};`)
      .join('') +
    tableNames
      .map(
        (tableName: string) => `ALTER TABLE ${tableName} ENABLE TRIGGER ALL;`,
      )
      .join(''),
  );
}