

// // server/routes/auth.js

// import express from 'express';
// import bcrypt from 'bcryptjs';
// import pool from '../config/db.js'; // Change 'db' to 'pool' as you're exporting the pool

// const router = express.Router();

// router.post('/register', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const hashed = await bcrypt.hash(password, 10);
//     // Now use pool.query()
//     const [result] = await pool.query(
//       'INSERT INTO users (email, password) VALUES (?, ?)',
//       [email, hashed]
//     );

//     res.status(201).json({ message: 'User registered' });
//   } catch (err) {
//     if (err.code === 'ER_DUP_ENTRY') {
//       res.status(409).json({ error: 'Email already registered' });
//     } else {
//       console.error("Registration error:", err); // Log the full error for debugging
//       res.status(500).json({ error: 'Failed to register user' });
//     }
//   }
// });

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Now use pool.query()
//     const [rows] = await pool.query('SELECT password FROM users WHERE email = ?', [email]);

//     if (rows.length === 0) {
//       return res.status(401).json({ error: 'Invalid login' });
//     }

//     const valid = await bcrypt.compare(password, rows[0].password);
//     if (!valid) {
//       return res.status(401).json({ error: 'Invalid login' });
//     }

//     res.json({ message: 'Login successful' });
//   } catch (err) {
//     console.error("Login error:", err); // Log the full error for debugging
//     res.status(500).json({ error: 'Login error' });
//   }
// });

// export default router;

// server/routes/auth.js

import express from 'express';
import bcrypt from 'bcryptjs';
import pool from '../config/db.js';
import jwt from 'jsonwebtoken'; // <--- NEW: Import jsonwebtoken

const router = express.Router();

// --- NEW: Define a JWT secret key ---

const JWT_SECRET = process.env.JWT_SECRET || 'e6bb2bc7b4586222d172eb80f7edd4a0dc687761696ff0968786a1b1fe32773646ecc833de2bbd25e96282c428e3842a41173b8fffd3da2e8454d15e8c093ecd';

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hashed]
    );

    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ error: 'Email already registered' });
    } else {
      console.error("Registration error:", err);
      res.status(500).json({ error: 'Failed to register user' });
    }
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query('SELECT id, email, password, is_admin FROM users WHERE email = ?', [email]); // <--- MODIFIED: Select 'id' and 'is_admin' too

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid login' });
    }

    const user = rows[0]; // Get the first (and only) user row
    const valid = await bcrypt.compare(password, user.password); // Compare with user.password

    if (!valid) {
      return res.status(401).json({ error: 'Invalid login' });
    }

    // --- NEW: Generate a JWT upon successful login ---
    const token = jwt.sign(
      { userId: user.id, email: user.email, isAdmin: user.is_admin || false }, // Payload: Data to store in the token
      JWT_SECRET, // The secret key used to sign the token
      { expiresIn: '1h' } // Token expiration time (e.g., 1 hour)
    );

    // --- MODIFIED: Send the token in the response ---
    res.status(200).json({
      message: 'Login successful!',
      token: token, // <--- Frontend will now receive this!
      user: { // Optionally, send back some non-sensitive user info
        id: user.id,
        email: user.email,
        isAdmin: user.is_admin || false
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: 'Login error' });
  }
});

export default router;