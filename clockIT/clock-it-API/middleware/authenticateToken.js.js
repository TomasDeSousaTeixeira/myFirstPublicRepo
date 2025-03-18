import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
const JWT_SECRET = process.env.SECRET_KEY;

const authenticateToken = (req, res, next) => {
 
  const token = req.cookies?.accessToken; 
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log("err: " + err)
      return res.status(403).json({ error: 'Invalid or expired token.' });
    }
      next();
  });
};

export default authenticateToken;
