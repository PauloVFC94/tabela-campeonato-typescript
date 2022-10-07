import { RequestHandler } from 'express';
import UserService from '../services/userService';

class UserController {
  constructor(private service = new UserService()) { }

  public login:RequestHandler = async (req, res) => {
    const { email, password } = req.body;
    const result = await this.service.login({ email, password });
    if (result.includes('JoiError')) {
      const [, status, message] = result.split('|');
      return res.status(Number(status)).json({ message });
    }
    res.status(200).json({ token: result });
  };
}

export default UserController;
