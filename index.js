const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const user = require('./models/user');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const { MongoClient, ServerApiVersion } = require('mongodb');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
const port = 4000;

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.set('public', path.join(__dirname, '/public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);

// Serverless-optimised database connection
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('=> Reusing existing database connection');
    return;
  }

  // Fallback string so your laptop runs perfectly even without an .env file configured yet
  const dbUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/instagram';

  console.log('=> Creating new database connection');
  try {
    const db = await mongoose.connect(dbUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = db.connections[0].readyState;
    console.log('MongoDB Connected Successfully!');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
  }
};

// ROUTES

app.get('/', (req, res) => {
  res.render('login.ejs');
});

app.get('/api/users', async (req, res) => {
  await connectDB(); // Always call this at the beginning of your serverless routes

  try {
    // Replace 'User' with your actual Mongoose Model
    const users = await user.find({ email: email });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/user', async (req, res) => {
  await connectDB();

  const { email, password } = req.body;
  console.log(`Get req from : ${email} with password : ${password}`);

  try {
    // 1. Search for matching documents (returns an array)
    const profileArray = await user.find({ email: email });

    // 2. If the array is empty, the user does not exist
    if (profileArray.length === 0) {
      console.log('User not found in Atlas database.');
      return res.redirect('/');
    }

    // 3. CRUCIAL FIX: Extract the actual user object out of the array
    const profile = profileArray[0];

    // 4. Verify password
    if (password === profile.password) {
      // Passes the clean object to profile.ejs
      res.render('profile.ejs', { profile });
    } else {
      console.log('Incorrect password.');
      res.redirect('/');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Database processing error.');
  }
});

app.get('/new', async (req, res) => {});

// --- SERVER INITIALIZATION ---

// ONLY run app.listen locally. Vercel handles its own port management in production.
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Instagram Active Locally on port ${PORT}`));
}

// Export for Vercel
module.exports = app;
