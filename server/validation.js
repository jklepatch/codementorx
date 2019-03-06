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
}

module.exports = {
  '/users': {
    POST: createUser
  },
  '/access-tokens': {
    POST: login
  }
};
