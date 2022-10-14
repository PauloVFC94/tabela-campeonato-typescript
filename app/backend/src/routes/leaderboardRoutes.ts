import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';
import LeaderboardService from '../services/leaderboardService';
import TeamsModel from '../models/teamModel';
import MatchesModel from '../models/matchModel';

const router = Router();

const leaderboardController = new LeaderboardController(new LeaderboardService(
  new TeamsModel(),
  new MatchesModel(),
));

router.get('/home', leaderboardController.findAllHome);
router.get('/away', leaderboardController.findAllAway);
router.get('/', leaderboardController.findAll);

export default router;
