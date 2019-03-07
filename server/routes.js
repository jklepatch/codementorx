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
  console.log(req.userId);
  const idea = await models.Idea.create({
    userId: req.userId,
    content: req.body.content,
    impact: req.body.impact,
    ease: req.body.ease,
    confidence: req.body.confidence
  });
  res.status(201);
  res.send({
    id: idea.dataValues.id,
    content: idea.dataValues.ontent,
    impact: idea.dataValues.mpact,
    ease: idea.dataValues.ease,
    confidence: idea.dataValues.confidence,
    average_score: average(idea.dataValues.impact, idea.dataValues.ease, idea.dataValues.confidence),
    created_at: idea.dataValues.createdAt
  });
});

router.get('/ideas', [ensureAuth], async(req, res) => {
  const page = (req.query.page && Math.max(parseInt(req.query.page), 1)) || 1;
  const ideas = await models.Idea.findAll({ 
    where: {
      userId: req.userId
    },
    limit: 10,
    raw: true,
    offset: (page - 1) * 10 + 1
  });
  res.send(ideas);
});

module.exports = router;
