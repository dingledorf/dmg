import fetch from 'node-fetch';
import Hardware from "entities/Hardware";
import dataSource from "../data-source";
const fs = require('fs');

const cache = require('../cache');
const hardwareRepository = dataSource.getRepository(Hardware);

type HardwareStats = {
  totalHashRate: number,
  activeMiners: number,
  miningRevenue: number,
  topMiner: Hardware | null
}

export type Statistics = HardwareStats & {
  bitcoinPrice: number,
  miningDifficulty: string
}

export interface IStatsService {
  fetchMiningStatistics: () => Promise<Statistics>
}

const HardwareService = new (require('services/HardwareService'))();

class StatsService implements IStatsService {
  static DIFFICULTY_CACHE_KEY = 'mining-difficulty'
  static BITCOIN_PRICE_CACHE_KEY = 'bitcoin-price'

  private async fetchMiningDifficulty(): Promise<string> {
    const cached = cache.get(StatsService.DIFFICULTY_CACHE_KEY)
    if(cached) {
      return cached;
    }

    const res = await fetch('https://blockchain.info/q/getdifficulty');
    const data = await res.text();
    cache.set(StatsService.DIFFICULTY_CACHE_KEY, data, 60 * 5); // 5 minutes
    return data;
  }

  private async fetchBitcoinPrice(): Promise<number> {
    const cached = cache.get(StatsService.BITCOIN_PRICE_CACHE_KEY)
    if(cached) {
      return parseFloat(cached);
    }

    const res = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
    const data: any = await res.json();
    const price: number = data.bpi.USD.rate_float;
    cache.set(StatsService.BITCOIN_PRICE_CACHE_KEY, price.toString(), 60 * 5); // 5 minutes
    return price;
  }

  private async fetchHardwareStats(): Promise<HardwareStats> {
    const stats = await hardwareRepository.createQueryBuilder()
      .select('COUNT(*) as "activeMiners"')
      .addSelect('SUM("hashRate") as "totalHashRate"')
      .getRawOne();

    const topMiner = await hardwareRepository.createQueryBuilder()
      .orderBy('"hashRate"', 'DESC')
      .limit(1)
      .getOne();

    return {
      activeMiners: parseInt(stats.activeMiners),
      totalHashRate: parseFloat(stats.totalHashRate),
      miningRevenue: JSON.parse(fs.readFileSync(__dirname + '/../data/statistics.json').toString()).miningRevenue,
      topMiner
    };
  }

  async fetchMiningStatistics(): Promise<Statistics> {
    return {
      ...(await this.fetchHardwareStats()),
      bitcoinPrice: await this.fetchBitcoinPrice(),
      miningDifficulty: await this.fetchMiningDifficulty()
    }
  }
}

module.exports = StatsService