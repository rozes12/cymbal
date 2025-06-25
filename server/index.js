// server/index.js
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 8080;

// Allow frontend dev and production origins
const allowedOrigins = ['http://localhost:5173', 'https://my-cymbal-app-723767509826.us-west1.run.app'];

// app.use(cors({
//   origin: allowedOrigins,
//   credentials: true,
// }));
app.use(cors()); // Allow all origins — not for production!


app.use(express.json());
app.use('/api', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
