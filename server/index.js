// // // server/index.js
// // import express from 'express';
// // import cors from 'cors';
// // import authRoutes from './routes/auth.js';

// // const app = express();
// // const PORT = process.env.PORT || 8080;

// // // Allow frontend dev and production origins
// // const allowedOrigins = ['http://localhost:5173', 'https://my-cymbal-app-723767509826.us-west1.run.app'];

// // app.use(cors({
// //   origin: allowedOrigins,
// //   credentials: true,
// // }));
// // // app.use(cors()); // Allow all origins — not for production!


// // app.use(express.json());
// // app.use('/api', authRoutes);

// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });


// // server/index.js
// import express from 'express';
// import cors from 'cors';
// import authRoutes from './routes/auth.js';
// import db from './config/db.js'; // Ensure db initializes connection

// const app = express();
// const PORT = process.env.PORT || 8080;

// // ✅ Allow frontend origin
// const allowedOrigins = ['http://localhost:5173', 'https://my-cymbal-app-723767509826.us-west1.run.app'];

// app.use(cors({
//   origin: allowedOrigins,
//   methods: ['GET', 'POST', 'OPTIONS'],
//   allowedHeaders: ['Content-Type'],
// }));
// // Handle preflight requests
// app.options('*', cors());


// app.use(express.json());
// app.use('/api', authRoutes);

// app.get('/', (req, res) => {
//   res.send('Cymbal server running.');
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });


import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-app-url'],
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());
app.use('/api', authRoutes);

// Serve frontend (React build)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../dist'))); // serve frontend files

// Fallback for React Router (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
