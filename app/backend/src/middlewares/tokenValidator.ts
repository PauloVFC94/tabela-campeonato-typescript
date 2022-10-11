import { RequestHandler } from 'express';
import tokenTools from '../helpers/token';

const tokenValidation:RequestHandler = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  try {
    const result = tokenTools.validateToken(authorization);
    res.locals.email = result.email;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default { tokenValidation };
