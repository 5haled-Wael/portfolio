import express from 'express';
import {
  getSkills,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill,
} from '../controllers/skillController.js';
import Auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getSkills).post(Auth, createSkill);
router
  .route('/:id')
  .get(getSkillById)
  .patch(Auth, updateSkill)
  .delete(Auth, deleteSkill);

export default router;
