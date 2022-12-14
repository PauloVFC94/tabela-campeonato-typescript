import { RequestHandler } from 'express';
import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  constructor(private service: LeaderboardService) { }

  public findAllHome:RequestHandler = async (_req, res, next) => {
    try {
      const result = await this.service.findAllHome();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public findAllAway:RequestHandler = async (_req, res, next) => {
    try {
      const result = await this.service.findAllAway();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  public findAll:RequestHandler = async (_req, res, next) => {
    try {
      const result = await this.service.findAll();
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
