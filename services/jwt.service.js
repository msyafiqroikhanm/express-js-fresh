const jwt = require("jsonwebtoken");

const generateJwt = async (data) => {
  const token = jwt.sign(data, process.env.JWT_PRIVATE_KEY, {
    expiresIn: "7d",
  });
  return token;
};
const verifyJwt = async (token) => {
  try {
    const payload = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    return payload;
  } catch (error) {
    console.log(error);
  }
};
module.exports = { generateJwt, verifyJwt };
