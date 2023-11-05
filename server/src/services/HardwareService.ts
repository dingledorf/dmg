import {ApiError} from "utils/utils";
import Hardware from "entities/Hardware";
import dataSource from "../data-source";

const cache = require('../cache');
const hardwareRepository = dataSource.getRepository(Hardware);

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

  /**
   * @param id
   */
  async find(id: number): Promise<Hardware> {
    const cached = cache.get(`${HardwareService.CACHE_KEY_PREFIX}/id`);
    if(cached) {
      return JSON.parse(cached) as Hardware;
    }

    const hardware = await hardwareRepository.findOneBy({id});
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
    const hardware = await hardwareRepository.create({
      name: params.name,
      location: params.location,
      hashRate: params.hashRate
    }).save();
    return hardware;
  }

  /**
   * @param id
   * @param params
   */
  async update(id: number, params: Omit<Hardware, 'id'>): Promise<Hardware> {
    const hardware = await hardwareRepository.findOneBy({id})
    if(hardware) {
      hardware.name = params.name;
      hardware.location = params.location;
      hardware.hashRate = params.hashRate;
      await hardware.save();
    } else {
      throw new ApiError(404);
    }
    cache.del(`${HardwareService.CACHE_KEY_PREFIX}/id`)
    return hardware;
  }

  async delete(id: number) {
    const hardware = await hardwareRepository.findOneBy({id})
    if(hardware) {
      await hardware.remove();
    } else {
      throw new ApiError(404);
    }
    cache.del(`${HardwareService.CACHE_KEY_PREFIX}/id`)
  }

  async get(params: {page?: string, location?: string, name?: string}): Promise<{hardware: Hardware[], total: number}> {
    const offset = params.page ? (parseInt(params.page) - 1) * HardwareService.PAGE_SIZE : 0;

    const query = hardwareRepository.createQueryBuilder();

    if(params.location) {
      query.andWhere('location LIKE :location', {location: `%${params.location}%`});
    }
    if(params.name) {
      query.andWhere('name LIKE :name', {name: `%${params.name}%`});
    }

    const total = await query.getCount();

    query.offset(offset);
    query.limit(HardwareService.PAGE_SIZE);
    query.orderBy('"id"')

    const hardware = await query.getMany();

    return {
      hardware,
      total
    }
  }
}

module.exports = HardwareService;