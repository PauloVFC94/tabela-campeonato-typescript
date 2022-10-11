import { Router } from 'express';
import MatchController from '../controllers/matchController';

const router = Router();

const matchController = new MatchController();

router.get('/', matchController.findAll);

export default router;
