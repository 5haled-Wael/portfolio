import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const Auth = async (req, res, next) => {
  let token = req.headers.authorization;
  if (!token || !token.startsWith('Bearer')) {
    res.status(401);
    throw new Error('Invalid Token');
  }

  token = token.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id).select('-password');
  if (!user) {
    res.status(401);
    throw new Error('Not authorized, user not found');
  }

  req.user = user;
  next();
};

export default Auth;
