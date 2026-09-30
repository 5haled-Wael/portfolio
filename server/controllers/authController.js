import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide email and password');
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  const token = generateToken(user._id);

  const userObj = {
    _id: user._id,
    email: user.email,
    token,
  };

  res.status(200).json(userObj);
};

export { login };
