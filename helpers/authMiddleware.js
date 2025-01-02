const jwt = require("jsonwebtoken");
const firebase = require("./firebase");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from 'Bearer <token>'

  if (token == null) return res.sendStatus(401); // Unauthorized

  try {
    const decodedToken = await firebase.verifyIdToken(token); // Verify token
    //jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    //if (err) return res.sendStatus(403); // Forbidden
    req.user = decodedToken; // Attach user information to the request object
    next();
    //});
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized " + error.message });
  }
};

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.user = user;
    next();
  });
};

// permissions middleware
const superAdminonly = (req, res, next) => {
  if (req.user.role !== "superadmin") {
    return res.sendStatus(403);
  }
  next();
};
const permissionsMiddleware = (req, res, next) => {
  const roles = ["admin", "superadmin"];
  if (!roles.includes(req.user.role)) {
    return res.sendStatus(403);
  }
  next();
};

module.exports = {
  authMiddleware,
  verifyToken,
  permissionsMiddleware,
  superAdminonly,
};
