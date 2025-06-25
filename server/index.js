// // server/index.js
// import express from 'express';
// import cors from 'cors';
// import authRoutes from './routes/auth.js';

// const app = express();
// const PORT = process.env.PORT || 8080;

// // Allow frontend dev and production origins
// const allowedOrigins = ['http://localhost:5173', 'https://my-cymbal-app-723767509826.us-west1.run.app'];

// app.use(cors({
//   origin: allowedOrigins,
//   credentials: true,
// }));
// // app.use(cors()); // Allow all origins — not for production!


// app.use(express.json());
// app.use('/api', authRoutes);

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// server/index.js
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import db from './config/db.js'; // Ensure db initializes connection

const app = express();
const PORT = process.env.PORT || 8080;

// ✅ Allow frontend origin
const allowedOrigins = ['http://localhost:5173', 'https://my-cymbal-app-723767509826.us-west1.run.app'];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());
app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.send('Cymbal server running.');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
