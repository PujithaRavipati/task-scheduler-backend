import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
require('dotenv').config();

import authRoutes from './routes/auth.routes';
import taskRoutes from './routes/task.routes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(json());

await connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Task Scheduler API is running');
});

app.listen(PORT, () => {
  console.log(`Server running......`);
});