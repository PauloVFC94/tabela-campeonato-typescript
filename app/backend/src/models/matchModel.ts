import Team from '../database/models/team';
import matchModel from '../database/models/match';
import IMatch from '../interfaces/IMatch';

class MatchModel {
  public model = matchModel;
  public async findAll(): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  public async querySearch(inProgress: boolean): Promise<IMatch[]> {
    const matches = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  public async createMatch(match: IMatch): Promise<IMatch> {
    const newMatch = await this.model.create(match);
    return newMatch;
  }
}

export default MatchModel;
