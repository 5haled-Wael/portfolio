import express from 'express';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/ProjectController.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();
const uploadImage = upload.single('image');

router.route('/').get(getAllProjects).post(uploadImage, createProject);
router
  .route('/:id')
  .get(getProjectById)
  .patch(uploadImage, updateProject)
  .delete(deleteProject);

export default router;
