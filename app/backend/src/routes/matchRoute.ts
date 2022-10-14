import { Router } from 'express';
import tokenValidator from '../middlewares/tokenValidator';
import MatchController from '../controllers/matchController';

const router = Router();

const matchController = new MatchController();

router.route('/')
  .get(matchController.findAll)
  .post(tokenValidator.tokenValidation, matchController.create);
router.route('/:id/finish')
  .patch(matchController.finishMatch);
router.route('/:id')
  .patch(matchController.updateGoals);

export default router;
