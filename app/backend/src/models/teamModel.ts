import team from '../database/models/team';
import ITeam from '../interfaces/ITeam';

class TeamModel {
  public model = team;

  public async findAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  public async findByPk(id: string | number): Promise<ITeam> {
    const selectedTeam = await this.model.findByPk(id);
    return selectedTeam as ITeam;
  }
}

export default TeamModel;
