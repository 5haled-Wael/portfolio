import express from 'express';
import cors from 'cors';
import projectRoutes from './routes/projectRoutes.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import skillRoutes from './routes/skillRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Portfolio API</h1>');
});

app.use(errorMiddleware);

export default app;
