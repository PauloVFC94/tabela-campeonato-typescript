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
    if (!result) {
      return res.status(401).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }
    return res.status(201).json(result);
  };

  public updateMatch:RequestHandler = async (req, res) => {
    const { id } = req.params;
    const message = await this.service.updateMatch(id);
    return res.status(200).json({ message });
  };

  public updateGoals:RequestHandler = async (req, res) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const score = { id, homeTeamGoals, awayTeamGoals };
    const message = await this.service.updateGoals(score);
    return res.status(200).json({ message });
  };
}

export default MatchController;
