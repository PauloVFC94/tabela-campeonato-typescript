import Team from '../database/models/team';
import matchModel from '../database/models/match';
import IMatch from '../interfaces/IMatch';
import IResult from '../interfaces/IResult';

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

  public async updateMatch(id: string): Promise<string> {
    await this.model.update({ inProgress: false }, { where: { id } });
    return 'Finished';
  }

  public async updateScore(score: IResult): Promise<string> {
    const { id, homeTeamScore, awayTeamScore } = score;
    await this.model.update({ homeTeamScore, awayTeamScore }, { where: { id } });
    return 'Updated';
  }
}

export default MatchModel;
