import { RequestHandler } from 'express';
import UserService from '../services/userService';

class UserController {
  constructor(private service = new UserService()) { }

  public login:RequestHandler = async (req, res) => {
    const { email, password } = req.body;
    const { status, message, token } = await this.service.login({ email, password });
    if (!token) return res.status(status).json({ message });
    return res.status(status).json({ token });
  };
}

export default UserController;
