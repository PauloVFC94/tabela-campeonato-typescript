import * as jwt from 'jsonwebtoken';
import { JwtPayload, SignOptions } from 'jsonwebtoken';
import IToken from '../interfaces/IToken';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';
const JWT_OPTIONS: SignOptions = { algorithm: 'HS256', expiresIn: '1d' };

const createToken = (payload: IToken) => {
  const token = jwt.sign(payload, JWT_SECRET, JWT_OPTIONS);
  return token;
};

const validateToken = (token: string): JwtPayload => {
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded as JwtPayload;
};

export default { createToken, validateToken };
