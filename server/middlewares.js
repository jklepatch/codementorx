const validateSchema = require('jsonschema').validate;
const jwt = require('jsonwebtoken');
const schemas = require('./validation');
const { JWT_SECRET } = require('./config/other');

const validate = (req, res, next) => {
  const schema = schemas[req.originalUrl] && schemas[req.originalUrl][req.method];
  if(typeof schema !== 'undefined') {
    const result = validateSchema(req.body, schema);
    if(result.errors.length === 0) {
      return next(null);
    }
    res.status(422);
    return res.send({type: 'error', errors: result.errors}); 
  }
  next(null);
};

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.send({ type: 'error', errors: err });
};

const ensureAuth = (req, res, next) => {
  const authHeader = req.headers.authorization && req.headers.authorization.split(' ');
  let decoded;

  try {
    decoded = jwt.verify(authHeader.length && authHeader.length > 1 && authHeader[1], JWT_SECRET);
  } catch(_e) {
    console.log(_e);
    return res.status(403).json({
      type: 'error',
      errors: ['Need to provide a valid authorization header with token']
    });
  }

  req.userId = decoded.sub;
  next();
};

module.exports = { validate, errorHandler, ensureAuth };
