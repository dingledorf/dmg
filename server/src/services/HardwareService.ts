import {ApiError} from "../utils/utils";

const fs = require('fs');
const cache = require('../cache');

export type Hardware = {
  id: number,
  name: string,
  location: string,
  hashRate: string
}

export interface IHardwareService {
  find(id: number): Promise<Hardware>;
  create(params: Omit<Hardware, 'id'>): Promise<Hardware>;
  update(id: number, params: Omit<Hardware, 'id'>): Promise<Hardware>;
  delete(id: number): void;
  get(params: {page?: string, location?: string, name?: string}): Promise<{hardware: Hardware[], total: number}>;
}

class HardwareService implements IHardwareService {
  static PAGE_SIZE = 50;
  static CACHE_KEY_PREFIX = 'hardware'

  private async saveHardwares(hardwares: Hardware[]): Promise<void> {
    fs.writeFileSync(__dirname + '/../data/hardware.json', JSON.stringify(hardwares));
  }

  async fetchAllHardware(): Promise<Hardware[]> {
    return JSON.parse(fs.readFileSync(__dirname + '/../data/hardware.json').toString());
  }

  /**
   * @param id
   */
  async find(id: number): Promise<Hardware> {
    const cached = cache.get(`${HardwareService.CACHE_KEY_PREFIX}/id`);
    if(cached) {
      return JSON.parse(cached) as Hardware;
    }

    const hardwares = await this.fetchAllHardware();
    const hardware = hardwares.find(h => h.id === id)
    if(hardware) {
      cache.set(`${HardwareService.CACHE_KEY_PREFIX}/id`, JSON.stringify(hardware));
      return hardware;
    } else {
      throw new ApiError(404);
    }
  }

  /**
   * Creates a new hardware and returns it
   * @param params
   */
  async create(params: Omit<Hardware, 'id'>): Promise<Hardware> {
    const hardwares = await this.fetchAllHardware();
    const lastId = hardwares[hardwares.length - 1]?.id ?? 0;
    const hardware = {
      id: lastId + 1,
      name: params.name,
      location: params.location,
      hashRate: `${params.hashRate} TH/S`
    };
    hardwares.push(hardware)
    await this.saveHardwares(hardwares);
    return hardware;
  }

  /**
   * @param id
   * @param params
   */
  async update(id: number, params: Omit<Hardware, 'id'>): Promise<Hardware> {
    const hardwares = await this.fetchAllHardware();
    const hardware = hardwares.find(h => h.id === id)
    if(hardware) {
      hardware.name = params.name;
      hardware.location = params.location;
      hardware.hashRate = `${params.hashRate} TH/S`;
    } else {
      throw new ApiError(404);
    }
    await this.saveHardwares(hardwares);
    cache.del(`${HardwareService.CACHE_KEY_PREFIX}/id`)
    return hardware;
  }

  async delete(id: number) {
    const hardwares = await this.fetchAllHardware();
    const index = hardwares.findIndex(h => h.id === id);
    if(index === -1) {
      throw new ApiError(404);
    } else {
      hardwares.splice(index, 1);
    }
    await this.saveHardwares(hardwares);
    cache.del(`${HardwareService.CACHE_KEY_PREFIX}/id`)
  }

  async get(params: {page?: string, location?: string, name?: string}): Promise<{hardware: Hardware[], total: number}> {
    let hardwares = await this.fetchAllHardware();

    if(params.location) {
      hardwares = hardwares.filter(h => h.location.match(new RegExp(params.location as string, 'i')))
    }
    if(params.name) {
      hardwares = hardwares.filter(h => h.name.match(new RegExp(params.name as string, 'i')))
    }

    const offset = params.page ? (parseInt(params.page) - 1) * HardwareService.PAGE_SIZE : 0;

    return {
      hardware: hardwares.slice(offset, offset+HardwareService.PAGE_SIZE),
      total: hardwares.length
    }
  }
}

module.exports = HardwareService;