import {Handler, Request, Response} from "express";
import {IAuthService} from "services/AuthService";

const StatsService = new (require('services/StatsService'))()

export const getStatistics: Handler = async (req: Request, res: Response) => {
  const statistics = await StatsService.fetchMiningStatistics();
  return res.json({...statistics});
}