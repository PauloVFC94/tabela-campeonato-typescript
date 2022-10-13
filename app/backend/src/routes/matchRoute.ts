import { Router } from 'express';
import tokenValidator from '../middlewares/tokenValidator';
import MatchController from '../controllers/matchController';

const router = Router();

const matchController = new MatchController();

router.get('/', matchController.findAll);
router.post('/', tokenValidator.tokenValidation, matchController.createMatch);
router.patch('/:id/finish', matchController.updateMatch);

export default router;
