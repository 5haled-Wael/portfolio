import express from 'express';
import {
  addVisit,
  getVisitsCount,
  getVisitsTimeline,
} from '../controllers/visitController.js';
import Auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(addVisit).get(Auth, getVisitsCount);
router.get('/timeline', Auth, getVisitsTimeline);

export default router;
