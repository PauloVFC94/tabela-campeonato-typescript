import { Router } from 'express';
import UserController from '../controllers/userController';

const router = Router();

const userController = new UserController();

router.route('/')
  .post(userController.login);

export default router;
