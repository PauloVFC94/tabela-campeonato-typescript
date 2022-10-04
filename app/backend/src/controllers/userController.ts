import { RequestHandler } from 'express';
import UserService from '../services/userService';

class UserController {
  constructor(private service = new UserService()) { }

  public login:RequestHandler = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    const result = await this.service.login(email, password);
    res.status(200).json({ token: result });
  };
}

export default UserController;
