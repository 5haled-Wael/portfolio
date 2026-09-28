import express from 'express';
import cors from 'cors';
import projectRoutes from './routes/projectRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/projects', projectRoutes);

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Portfolio API</h1>');
});

export default app;
