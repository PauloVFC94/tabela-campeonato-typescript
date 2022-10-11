import TeamModel from '../models/teamModel';
import ITeam from '../interfaces/ITeam';

class TeamService {
  public model: TeamModel;

  constructor() {
    this.model = new TeamModel();
  }

  public async findAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  public async findByPk(id: string): Promise<ITeam> {
    const selectedTeam = await this.model.findByPk(id);
    return selectedTeam;
  }
}

export default TeamService;
