import dataSource from "../data-source";

const HardwareService = require('services/HardwareService');
import {json, request} from "../tests/express";
import * as HardwareController from 'controllers/HardwareController';
import Hardware from "../entities/Hardware";

const sinon = require("sinon");
const fs = require('fs');

describe('HardwareController', () => {
  describe('createHardware',  () => {
    it('should throw a 400 error if invalid body', async () => {
      const validBody = {
        name: "Test",
        location: "Test",
        hashRate: "34198234234.234"
      }
      const invalidRequests: Record<string, any> = {
        "name": {
          ...validBody,
          name: true
        },
        "location": {
          ...validBody,
          location: -41
        },
        "hashRate": {
          ...validBody,
          hashRate: null
        }
      };
      for(const field in invalidRequests) {
        try {
          expect(request(HardwareController.createHardware, {body: invalidRequests[field]})).to.eventually.throw
        } catch (err: any) {
          expect(err.status).to.eq(400);
          expect(err.inner.errors[0].path).to.eq(field);
        }
      }
    })
    it('should return a created hardware', async () => {
      const hardware = {
        name: "Test",
        location: "Test",
        hashRate: "34198234234.234"
      };
      sinon.stub(HardwareService.prototype, 'create').resolves({
        id: 132,
        ...hardware
      });
      const response = await json(HardwareController.createHardware, {body: hardware});
      expect(response.id).to.eq(132);
    })
  })
  describe('updateHardware',  () => {
    it('should throw a 400 error if invalid body', async () => {
      const validBody = {
        name: "Test",
        location: "Test",
        hashRate: "34198234234.234"
      }
      const invalidRequests: Record<string, any> = {
        "name": {
          ...validBody,
          name: true
        },
        "location": {
          ...validBody,
          location: -41
        },
        "hashRate": {
          ...validBody,
          hashRate: false
        }
      };
      for(const field in invalidRequests) {
        try {
          expect(await request(HardwareController.updateHardware, {params: {id: "41"}, body: invalidRequests[field]})).to.eventually.throw;
        } catch (err: any) {
          expect(err.status).to.eq(400);
          expect(err.inner.errors[0].path).to.eq(field);
        }
      }
    })
    it('should throw 404 if hardware does not exist', async () => {
      sinon.stub(fs, 'readFileSync').returns('[]');
      try {
        await request(HardwareController.updateHardware, {params: {id: "41"}, body: {
            name: "Test",
            location: "Test",
            hashRate: "34198234234.234"
          }});
      } catch (err: any) {
        expect(err.status).to.eq(404);
      }
    })
    it('should update the hardware and return it', async () => {
      const hardware = await dataSource.getRepository(Hardware).create({
        name: "Test",
        location: "Test",
        hashRate: 12
      }).save();

      const response = await json(HardwareController.updateHardware, {params: {id: hardware.id}, body: {
            name: "Updated",
            location: "Test",
            hashRate: 120
          }});
      expect(response.id).to.eq(hardware.id);
      expect(response.name).to.eq('Updated');
      expect(response.hashRate).to.eq(120);
    })
  })
  describe('findHardware',  () => {
    it('throws 404 if hardware not found', async () => {
      sinon.stub(fs, 'readFileSync').returns('[]');
      try {
        await request(HardwareController.findHardware, {params: {id: "41"}});
      } catch (err: any) {
        expect(err.status).to.eq(404);
      }
    })
    it('returns hardware if found', async () => {
      const hardware = await dataSource.getRepository(Hardware).create({
        name: "Test",
        location: "Test",
        hashRate: 12
      }).save();

      const resp = await json(HardwareController.findHardware, {params: {id: hardware.id}});
      expect(resp.id).to.eq(hardware.id);
    })
  })
  describe('getHardware',  () => {
    it('should throw a 400 error if invalid body', async () => {
      const invalidRequests: Record<string, any> = {
        "page": {
          page: 0
        },
        "name": {
          name: null
        },
        "location": {
          location: 32
        }
      };
      for(const field in invalidRequests) {
        try {
          expect(await request(HardwareController.getHardware, {query: invalidRequests[field]})).to.eventually.throw;
        } catch (err: any) {
          expect(err.status).to.eq(400);
          expect(err.inner.errors[0].path).to.eq(field);
        }
      }
    })
    it('should page results', async () => {
      const hardware = await dataSource.getRepository(Hardware).create({
        name: "Test",
        location: "Test",
        hashRate: 12
      }).save();
      let resp = await json(HardwareController.getHardware, {query: {page: 1}});
      expect(resp.hardware[0].id).to.equal(hardware.id);
      resp = await json(HardwareController.getHardware, {query: {page: 2}});
      expect(resp.hardware).to.be.empty
    })
    it('should filter results by name and location', async () => {
      await dataSource.getRepository(Hardware).insert([{"name":"Antminer S2","location":"Mining Facility C","hashRate":95.473375856326211},{"name":"Antminer S2","location":"Mining Facility A","hashRate":63.124653604061336},{"name":"Antminer S3","location":"Mining Facility B","hashRate":150.0160810465253},{"name":"Antminer S4","location":"Mining Facility C","hashRate":129.9991929861352}]);
      const resp = await json(HardwareController.getHardware, {query: {name: "Antminer S2", location: "Mining Facility A"}});
      expect(resp.hardware.length).to.eq(1);
      expect(resp.hardware[0].name).to.eq("Antminer S2")
      expect(resp.hardware[0].location).to.eq("Mining Facility A")
    });
  })
  describe('deleteHardware',  () => {
    it('should throw a 404 error if not found', async () => {
      try {
        expect(await request(HardwareController.deleteHardware, {params: {id: "323"}})).to.eventually.throw;
      } catch (err: any) {
        expect(err.status).to.eq(404);
      }
    })
    it('should return 200 if deleted', async () => {
      const hardware = await dataSource.getRepository(Hardware).create({
        name: "Test",
        location: "Test",
        hashRate: 12
      }).save();
      const resp = await request(HardwareController.deleteHardware, {params: {id: hardware.id}});
      expect(resp.statusCode).to.eq(200);
      expect(dataSource.getRepository(Hardware).findOneBy({id: hardware.id})).to.be.eventually.null;
    })
  })
})