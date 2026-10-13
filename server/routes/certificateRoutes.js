import express from 'express';
import {
  createCertificate,
  getCertificate,
  getCertificates,
  updateCertificate,
  deleteCertificate,
} from '../controllers/certificateController.js';
import Auth from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();
const uploadImage = upload.array('images');

router
  .route('/')
  .get(getCertificates)
  .post(Auth, uploadImage, createCertificate);

router
  .route('/:id')
  .get(getCertificate)
  .patch(Auth, uploadImage, updateCertificate)
  .delete(Auth, deleteCertificate);

export default router;
