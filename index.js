const express = require('express');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const passportSetup = require('./config/passportSetup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();

//setup view engine
app.set('view engine', 'ejs');

//setup cookie
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log('connected to mongodb')
})

//setup routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);


//home route
app.get('/', (req, res) => {
  res.render('home', {user: req.user})
});

app.listen(3000, () => {
  console.log('app listening on port 3000')
});