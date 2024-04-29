const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const logger = require('../utils/logger');
exports.login = async (req, res, next) => {
  try {
    const {email,password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'No user found with this email' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      return res.json({ message: 'Success' });
    } else {
      return res.status(401).json({ error: 'Incorrect password' });
    }
  } catch (error) {
    logger.error('Login error:', error);
    next(error);
  }
};
exports.register = async (req, res, next) => {
  try {
    const { email } = req.body;
    const isEmailExist = await UserModel.findOne({ email });
    if (isEmailExist) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await UserModel.create({ email, password: hashedPassword });
    return res.json(newUser);
  } catch (error) {
    logger.error('Registration error:', error);
    next(error);
  }
};
