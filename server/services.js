const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');
const { JWT_SECRET } = require('./config/other');

const expiresIn = 600; //10 mins
const refreshTokens = {}; //could be moved to db

const login = (user) => {
  const access = jwt.sign({sub: user.id }, JWT_SECRET, {expiresIn});
  const refresh = randtoken.uid(256); 
  refreshTokens[refresh] = user.id;
  return { access, refresh };
}

const logout = (user) => {
  refreshTokens[user.refresh_token] = undefined;
}

const refreshJWT = (user) => {
  if(!refreshTokens[user.refresh_token] || refreshTokens[user.refreshToken] !== parseInt(user.id)) {
    return false;
  }
  return jwt.sign({sub: user.id }, JWT_SECRET, {expiresIn});
}

module.exports = { login, logout, refreshJWT };
