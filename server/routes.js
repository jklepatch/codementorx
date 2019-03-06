const { Router } = require('express');
const bcrypt = require('bcrypt');
const models = require('./db/models');
const { login } = require('./services');

const router = new Router();

router.post('/users', async (req, res, next) => {
  let user;
  const hash = await bcrypt.hash(req.body.password, 10);
  try {
    user = await models.User.create({
      email: req.body.email,
      name: req.body.name,
      password: hash 
    });
  } catch(err) {
    return next(err.errors);
  }
  const tokens = login(user);
  res.status(201);
  res.send({jwt: tokens.access, refresh_token: tokens.refresh });
});

router.post('/access-tokens', async (req, res) => {
  const user = await models.User.findOne({where: {email: req.body.email}}) 
  if(user) {
    const match = await bcrypt.compare(req.body.password, user.password);
    if(match) {
      const tokens = login(user);
      res.status(201);
      return res.send({jwt: tokens.access, refresh_token: tokens.refresh });
    }
  }
  res.status(403);
  res.send({type: 'error', errors: ['Wrong username or password']});
});

module.exports = router;
