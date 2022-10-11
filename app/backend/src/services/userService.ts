import UserModel from '../models/userModel';
import tokenTool from '../helpers/token';
import Bcrypt from '../helpers/bcrypt';
import { ILogin, validateLogin } from '../interfaces/ILogin';

type UserLogin = {
  status: number,
  message?: string,
  token?: string,
};

export default class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel();
  }

  public async login(loginInput: ILogin): Promise<UserLogin> {
    const result = await this.model.findOne(loginInput.email);
    const { error } = validateLogin.validate(loginInput);
    if (error) {
      const [status, message] = error.message.split('|');
      return { status: Number(status), message };
    }

    if (!result || !Bcrypt.compare(result.password, loginInput.password)) {
      return { status: 401, message: 'Incorrect email or password' };
    }

    const token = tokenTool.createToken({ email: result.email });
    return { status: 200, token };
  }

  public async findEmail(email: string): Promise<ILogin> {
    const response = await this.model.findOne(email);
    return response;
  }
}
