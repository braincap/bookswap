const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('users');
const requireAuth = require('../middleware/requireAuth');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => res.redirect('/')
  );

  app.get('/test', (req, res) => {
    console.log('test');
    res.send('LOL');
  });

  app.get('/api/logout', (req, res) => {
    console.log('2) JT LOGOUT ROUTE');
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', requireAuth, (req, res) => {
    console.log('3) JT CURRENT USER');
    res.send(req.user);
  });

  app.get('/api/user_id_details', requireAuth, async (req, res) => {
    const user = await User.find({}, '_id name city state contact');
    res.send(user);
  });

  app.post('/api/update_profile', requireAuth, async (req, res) => {
    const { name, city, state, contact } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, city, state, contact },
      { new: true }
    );
    res.send(req.user);
  });
};
