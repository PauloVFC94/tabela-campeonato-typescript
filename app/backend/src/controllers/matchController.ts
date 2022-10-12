import { RequestHandler } from 'express';
import MatchService from '../services/matchService';

class MatchController {
  constructor(private service = new MatchService()) { }

  public findAll:RequestHandler = async (req, res) => {
    const { inProgress } = req.query;
    const matches = await this.service.findAll(inProgress as string);
    return res.status(200).json(matches);
  };
}

export default MatchController;
