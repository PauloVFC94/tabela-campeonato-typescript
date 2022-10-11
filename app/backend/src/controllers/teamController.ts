import { RequestHandler } from 'express';
import TeamService from '../services/teamService';

class TeamController {
  constructor(private service = new TeamService()) {}

  public findAll:RequestHandler = async (_req, res) => {
    const teams = await this.service.findAll();
    return res.status(200).json(teams);
  };
}

export default TeamController;
