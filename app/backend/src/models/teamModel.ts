import team from '../database/models/team';
import ITeam from '../interfaces/ITeam';

class TeamModel {
  public model = team;

  public async findAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    return teams;
  }
}

export default TeamModel;
