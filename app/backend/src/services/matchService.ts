import MatchModel from '../models/matchModel';
import IMatch from '../interfaces/IMatch';

class MatchService {
  public model: MatchModel;

  constructor() {
    this.model = new MatchModel();
  }

  public async findAll(): Promise<IMatch[]> {
    const matches = await this.model.findAll();
    return matches;
  }
}

export default MatchService;
