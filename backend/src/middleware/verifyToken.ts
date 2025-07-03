import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing");
}

async function verifyToken(req: any, res: any, next: any) {
  const authHeader = req.headers['authorization'];
  console.log("Authorization Header:", authHeader);

  const token = authHeader?.split(" ")[1];
  console.log("Extracted Token:", token);

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log("Decoded:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Verify Error:", error);
    return res.status(401).json({ message: 'Invalid token.' });
  }
}

export default verifyToken;