import UserModel from '../models/userModel';
import tokenTool from '../helpers/token';
import Bcrypt from '../helpers/bcrypt';
import { ILogin, validateLogin } from '../interfaces/ILogin';

export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel();
  }

  public async login(loginInput: ILogin): Promise<string> {
    const result = await this.model.findOne(loginInput.email);
    const { error } = validateLogin.validate(loginInput);
    if (error) return error.message;
    Bcrypt.compare(loginInput.password, result.password);
    const token = tokenTool.createToken({ email: result.email });
    return token;
  }
}
