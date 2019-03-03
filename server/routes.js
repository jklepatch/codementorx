const { Router } = require('express');
const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');
const models = require('./db/models');

const secret = 'MY_INSECURE_SECRET';
const router = new Router();
const refreshTokens = {}; //could be moved to db

router.post('/users', async (req, res, next) => {
  let user;
  try {
    user = await models.User.create({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password
    });
  } catch(err) {
    return next(err.errors);
  }
  const token = jwt.sign({sub: user.id }, secret, {expiresIn: 300});
  const refresh_token = randtoken.uid(256); 
  refreshTokens[refresh_token] = user.id;
  res.status(201);
  res.send({jwt: token, refresh_token });
});

module.exports = router;
