const createUser = {
  type: "object",
  required: true,
  properties: {
    email: {type: "string"}, 
    name: {type: "string"},
    password: {
      type: "string", 
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    }
  },
  required: ["email", "name", "password"]
};

const login = {
  type: "object",
  required: true,
  properties: {
    email: {type: "string"}, 
    password: {type: "string"}
  },
  required: ["email", "password"]
};

const createIdea = {
  type: "object",
  required: true,
  properties: {
    content: {type: "string"}, 
    impact: {type: "integer", minimum: 1, maximum: 10},
    ease: {type: "integer", minimum: 1, maximum: 10},
    confidence: {type: "integer", minimum: 1, maximum: 10}
  },
  required: ["content", "impact", "ease", "confidence"]
};

module.exports = {
  '/users': {
    POST: createUser
  },
  '/access-tokens': {
    POST: login
  },
  //'/ideas': {
  //  POST: createIdea
  //}
};
