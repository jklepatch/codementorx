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

module.exports = {
  '/users': {
      POST: createUser
  }
};
