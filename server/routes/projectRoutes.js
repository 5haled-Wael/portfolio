import express from 'express';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/ProjectController.js';
import upload from '../middleware/uploadMiddleware.js';
import Auth from '../middleware/authMiddleware.js';

const router = express.Router();
const uploadImage = upload.single('image');

router.route('/').get(getAllProjects).post(Auth, uploadImage, createProject);
router
  .route('/:id')
  .get(getProjectById)
  .patch(Auth, uploadImage, updateProject)
  .delete(Auth, deleteProject);

export default router;
