import User from '../database/models/user';
import { ILogin } from '../interfaces/ILogin';

export default class UserModel {
  public model = User;

  public async findOne(email: string): Promise<ILogin> {
    const result = await this.model.findOne({ where: { email } });
    return result as ILogin;
  }
}
