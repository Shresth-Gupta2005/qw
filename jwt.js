const jwt = require("jsonwebtoken");
const jwtAuthMidddleware = (req, res, next) => {
  //first check request headers has authorization or not
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res.status(404).json({ error: "Unauthorized" });
  }
  console.log(req.headers.authorization);
  //extracting jwt token from req.header
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(404).json({ error: "Unauthorized" });
  }
  try {
    //verifying jwt token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    //attach user information to the request object
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid token" });
  }
};
const generateToken = (userData) => {
  return jwt.sign(userData, process.env.JWT_SECRET);
};
module.exports = { jwtAuthMidddleware, generateToken };
