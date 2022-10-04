import { RequestHandler } from 'express';
import UserService from '../services/userService';

class UserController {
  constructor(private service = new UserService()) { }

  public login:RequestHandler = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      const result = await this.service.login({ email, password });
      console.log(result);
      res.status(200).json({ token: result });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
}

export default UserController;
