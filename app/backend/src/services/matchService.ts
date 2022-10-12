import MatchModel from '../models/matchModel';
import IMatch from '../interfaces/IMatch';

class MatchService {
  public model: MatchModel;

  constructor() {
    this.model = new MatchModel();
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
}

export default MatchService;