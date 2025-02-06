import jwt from "jsonwebtoken";

export const isAuthenticated = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode; // Attach the decoded user payload to the request object
    next();
  } catch (error) {
    res.status(400).send("Invalid access token");
  }
};
