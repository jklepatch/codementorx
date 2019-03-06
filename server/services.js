const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');

const secret = 'MY_INSECURE_SECRET';
const expiresIn = 300;
const refreshTokens = {}; //could be moved to db

const login = (user) => {
  const access = jwt.sign({sub: user.id }, secret, {expiresIn});
  const refresh = randtoken.uid(256); 
  refreshTokens[refresh] = user.id;
  return { access, refresh };
}

module.exports = { login };
