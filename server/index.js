import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors({
  origin: ['http://localhost:5173', 'https://my-cymbal-app-723767509826.us-west1.run.app'], // Your Cloud Run frontend URL
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.options('*', cors());

app.use(express.json());

app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.send('Cymbal Backend API running.');
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});