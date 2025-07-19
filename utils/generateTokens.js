import jwt from "jsonwebtoken"; // لو بتستخدمي ES Modules
// const jwt = require("jsonwebtoken"); // لو CommonJS

const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, username: user.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

export default generateTokens;
// module.exports = generateTokens; // لو CommonJS
