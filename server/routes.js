const { Router } = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const md5 = require('md5');
const models = require('./db/models');
const { ensureAuth } = require('./middlewares');
const { login, logout, refreshJWT } = require('./services');
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

router.post('/access-tokens/refresh', async (req, res) => {
  const token = refreshJWT({refresh_token: req.body.refresh_token, id: req.userId});
  if(!token) {
    res.status(403);
    res.send({type: 'error', errors: ['refresh_token invalid']});
    return;
  }
  res.send({jwt: token})
});

router.delete('/access-tokens', [ensureAuth], async (req, res) => {
  logout({refresh_token: req.body.refresh_token});
  res.status(204);
  res.send({refresh_token: req.body.refresh_token });
});

router.get('/me', [ensureAuth], async (req, res) => {
  const user = await models.User.findByPk(req.userId);
  if(!user) {
    res.status(404);
    return res.send({type: 'error', errors: ['This user does not exist'] });
  }
  res.send({
    email: user.dataValues.user,
    name: user.dataValues.name,
    avatar_url: `https://www.gravatar.com/avatar/${md5(user.dataValues.email)}`
  });
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
    id: idea.dataValues.id,
    content: idea.dataValues.content,
    impact: idea.dataValues.compact,
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

router.delete('/ideas/:id', [ensureAuth], async(req, res) => {
  const id = parseInt(req.params.id);
  const idea = await models.Idea.findByPk(id);
  if(idea === null) {
    res.status(404);
    return res.send({type: 'error', errors: ['This idea does not exist']});
  }
  if(idea.dataValues.userId != req.userId) {
    res.status(403);
    return res.send({type: 'error', errors: ['Can only delete your own ideas']});
  }
  await models.Idea.destroy({where: {id}});
  res.status(204);
  res.send();
});

router.put('/ideas/:id', [ensureAuth], async(req, res) => {
  const id = parseInt(req.params.id);
  const idea = await models.Idea.findByPk(id);
  if(idea === null) {
    res.status(404);
    return res.send({type: 'error', errors: ['This idea does not exist']});
  }
  if(idea.dataValues.userId != req.userId) {
    res.status(403);
    return res.send({type: 'error', errors: ['Can only edit your own ideas']});
  }
  await models.Idea.update({...req.body}, {where: {id}});
  res.send({
    id: idea.dataValues.id,
    content: idea.dataValues.content,
    impact: idea.dataValues.mpact,
    ease: idea.dataValues.ease,
    confidence: idea.dataValues.confidence,
    average_score: average(idea.dataValues.impact, idea.dataValues.ease, idea.dataValues.confidence),
    created_at: idea.dataValues.createdAt
  });
});

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..public/index.html'));
})

module.exports = router;
