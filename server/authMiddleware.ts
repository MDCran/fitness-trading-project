import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';


interface CustomRequest extends Request {
  userID?: string;
}

export const auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const SECRET_KEY = process.env.JWT_SECRET!;
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).send('No token provided');
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        console.error("JWT verification failed");
        return res.status(401).send('Invalid token');
      }

      const userID = (decoded as JwtPayload).id as string;
      req.userID = userID;

      next();
    });
  } catch {
    console.error("Authentication failed");
    res.status(401).send('Please authenticate');
  }
};
