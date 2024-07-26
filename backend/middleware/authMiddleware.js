import { verify } from 'jsonwebtoken';
import { findById } from '../models/User';

export async function protect(req, res, next) {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
  }

  try {
    const decoded = verify(token, 'secret');
    req.user = await findById(decoded.id);
    next();
  } catch (err) {
    res.status(401).json({ success: false, error: 'Not authorized to access this route' });
  }
}

export function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, error: 'Not authorized to access this route' });
    }
    next();
  };
}
