const JWT = require("jsonwebtoken");

const SECRET_KEY = "THISISMYSECRETKEY";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
  };

  const token = JWT.sign(payload, SECRET_KEY);

  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, SECRET_KEY);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
