
// import express from 'express';
// import cors from 'cors';
// import authRoutes from './routes/auth.js';

// const app = express();
// const PORT = process.env.PORT || 8080; // Keep listening on 8080 for Cloud Run/Docker Compose

// // Enable CORS for your frontend origins
// app.use(cors({
//   origin: ['http://localhost:5173', 'https://my-cymbal-app-723767509826.us-west1.run.app'], // Your Cloud Run frontend URL
//   methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'], // Add all methods your API will use
//   credentials: true,
//   allowedHeaders: ['Content-Type', 'Authorization'], // Add Authorization if you use tokens
// }));
// app.options('*', cors()); // Handle preflight requests

// app.use(express.json());
// app.use('/api', authRoutes);

// app.get('/', (req, res) => {
//   res.send('Cymbal Backend API running.'); // Simple health check/status
// });

// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
// });


import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 8080;

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