const { Router } = require('express');
const bcrypt = require('bcrypt');
const models = require('./db/models');
const { ensureAuth } = require('./middlewares');
const { login } = require('./services');
const { average } = require('./utils');

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

router.post('/ideas', [ensureAuth], async(req, res) => {
  const idea = await models.Idea.create({
    userId: req.userId,
    content: req.body.content,
    impact: req.body.impact,
    ease: req.body.ease,
    confidence: req.body.confidence
  });
  res.status(201);
  res.send({
    id: idea.id,
    content: idea.content,
    impact: idea.impact,
    ease: idea.ease,
    confidence: idea.confidence,
    average_score: average(idea.impact, idea.ease, idea.confidence),
    created_at: idea.createdAt
  });
});

module.exports = router;
