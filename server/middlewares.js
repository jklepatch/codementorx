const validateSchema = require('jsonschema').validate;
const schemas = require('./validation');

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
}

module.exports = { validate, errorHandler };
