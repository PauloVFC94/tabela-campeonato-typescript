import MatchesModel from '../models/matchModel';
import TeamsModel from '../models/teamModel';
import IMatch from '../interfaces/IMatch';
import IGoals from '../interfaces/IResult';

interface MatchResponse {
  status: number;
  message?: string;
  result?: IMatch;
}
export default class MatchesService {
  public model: MatchesModel;
  public teamsModel: TeamsModel;
  constructor() {
    this.model = new MatchesModel();
    this.teamsModel = new TeamsModel();
  }

  public async findAll(inProgress: string): Promise<IMatch[]> {
    if (inProgress) {
      const inProgressBool = JSON.parse(inProgress as string);
      const result = await this.model.queryAll(inProgressBool);
      return result;
    }
    const result = await this.model.findAll();
    return result;
  }

  public async createMatch(match: IMatch): Promise<MatchResponse> {
    if (match.homeTeam === match.awayTeam) {
      return {
        status: 401,
        message: 'It is not possible to create a match with two equal teams',
      };
    }
    const checkHomeTeam = await this.teamsModel.findByPk(match.homeTeam);
    const checkAwayTeam = await this.teamsModel.findByPk(match.awayTeam);
    if (!checkHomeTeam || !checkAwayTeam) {
      return {
        status: 404,
        message: 'There is no team with such id!',
      };
    }
    const result = await this.model.create({ ...match, inProgress: true });
    return { status: 201, result };
  }

  public async finishMatch(id: string): Promise<string> {
    const result = await this.model.finishMatch(id);
    return result;
  }

  public async updateGoals(goals: IGoals): Promise<string> {
    const result = await this.model.updateGoals(goals);
    return result;
  }
}
