const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const user = require('./models/user');
const port = 4000;
const app = express();
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.set('public', path.join(__dirname, '/public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
// connecting to database
const main = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/instagram');
};

main()
  .then((res) => {
    console.log('Database Stayly : Connected');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log('Instagram Active');
});

app.get('/', (req, res) => {
  res.render('login.ejs');
});

app.post('/user', async (req, res) => {
  const profile = await user.find({ username: 'hrittik_india' });
  console.log(profile);
  res.render('profile.ejs', { profile });
});
