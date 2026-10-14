import express from 'express';
import { getProfile, updateProfile } from '../controllers/profileController.js';
import upload from '../middleware/uploadMiddleware.js';
import Auth from '../middleware/authMiddleware.js';

const router = express.Router();

const uploadProfileFiles = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'cv', maxCount: 1 },
]);

router
  .route('/')
  .get(getProfile)
  .patch(Auth, uploadProfileFiles, updateProfile);

export default router;
