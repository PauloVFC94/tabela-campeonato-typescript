import UserModel from '../models/userModel';
import tokenTool from '../helpers/token';
import Bcrypt from '../helpers/bcrypt';

export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel();
  }

  public async login(email: string, password: string): Promise<string> {
    const result = await this.model.findOne(email);
    Bcrypt.compare(password, result.password);
    const token = tokenTool.createToken({ email: result.email });
    return token;
  }
}
