const router = require('express').Router();

//middleware to check if user is logged in
const requireLogin = (req, res, next) => {
  if(!req.user){
    //res.send('You need to login');
    res.redirect('/auth/login');
  }
  next()
};

router.get('/', requireLogin, (req, res) => {
  //res.send('Hello ' + req.user.username);
  res.render('profile',{user: req.user})
});

module.exports = router;