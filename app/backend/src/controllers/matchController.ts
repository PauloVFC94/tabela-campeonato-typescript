import { RequestHandler } from 'express';
import MatchService from '../services/matchService';

class MatchController {
  constructor(private service = new MatchService()) { }

  public findAll:RequestHandler = async (req, res) => {
    const { inProgress } = req.query;
    const matches = await this.service.findAll(inProgress as string);
    return res.status(200).json(matches);
  };

  public createMatch:RequestHandler = async (req, res) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
    const newMatch = { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals };
    const result = await this.service.createMatch(newMatch);
    return res.status(201).json(result);
  };
}

export default MatchController;
