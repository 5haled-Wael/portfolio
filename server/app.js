import express from 'express';
import cors from 'cors';
import projectRoutes from './routes/projectRoutes.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import certificateRoutes from './routes/certificateRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import visitRoutes from './routes/visitRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/visits', visitRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Portfolio API</h1>');
});

app.use(errorMiddleware);

export default app;
