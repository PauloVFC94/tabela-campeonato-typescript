import MatchModel from '../models/matchModel';
import TeamModel from '../models/teamModel';
import IMatch from '../interfaces/IMatch';
import IResult from '../interfaces/IResult';

interface MatchResult {
  status: number;
  message?: string;
  result?: IMatch;
}

class MatchService {
  public model: MatchModel;
  public teamModel: TeamModel;

  constructor() {
    this.model = new MatchModel();
    this.teamModel = new TeamModel();
  }

  public async findAll(inProgress: string): Promise<IMatch[]> {
    if (inProgress) {
      const booleanProgress = JSON.parse(inProgress as string);
      const matches = await this.model.querySearch(booleanProgress);
      return matches;
    }

    const matches = await this.model.findAll();
    return matches;
  }

  public async createMatch(match: IMatch): Promise<MatchResult> {
    if (match.homeTeam === match.awayTeam) {
      return {
        status: 401,
        message: 'It is not possible to create a match with two equal teams',
      };
    }
    const checkTeam1 = await this.teamModel.findByPk(match.homeTeam);
    const checkTeam2 = await this.teamModel.findByPk(match.awayTeam);

    if (!checkTeam1 || !checkTeam2) {
      return {
        status: 404,
        message: 'There is no team with such id!',
      };
    }
    const newMatch = await this.model.createMatch({ ...match, inProgress: true });
    return { status: 201, result: newMatch };
  }

  public async updateMatch(id: string): Promise<string> {
    const updatedMatch = await this.model.updateMatch(id);
    return updatedMatch;
  }

  public async updateGoals(score: IResult): Promise<string> {
    const newScore = await this.model.updateGoals(score);
    return newScore;
  }
}

export default MatchService;
