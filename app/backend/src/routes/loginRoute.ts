import { Router } from 'express';
import tokenValidator from '../middlewares/tokenValidator';
import UserController from '../controllers/userController';

const router = Router();

const userController = new UserController();

router.route('/')
  .post(userController.login);

router.route('/validate')
  .get(tokenValidator.tokenValidation, userController.role);

export default router;
