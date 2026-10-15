import express from 'express';
import {
  getAllMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
} from '../controllers/messageController.js';
import Auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(Auth, getAllMessages).post(createMessage);

router
  .route('/:id')
  .get(Auth, getMessage)
  .patch(Auth, updateMessage)
  .delete(Auth, deleteMessage);

export default router;
