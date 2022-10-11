import { RequestHandler } from 'express';
import MatchService from '../services/matchService';

class MatchController {
  constructor(private service = new MatchService()) { }

  public findAll:RequestHandler = async (_req, res) => {
    const matches = await this.service.findAll();
    return res.status(200).json(matches);
  };
}

export default MatchController;
