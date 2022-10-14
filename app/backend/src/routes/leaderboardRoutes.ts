import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/home', leaderboardController.findAllHome);
router.get('/away', leaderboardController.findAllAway);
router.get('/', leaderboardController.findAll);

export default router;
