const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

const register = async (req, res) => {
  const db = req.app.locals.db;
  const userCollection = new UserModel(db);

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields required' });
  }

  const existing = await userCollection.findByEmail(email);
  if (existing) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userCollection.create({
    name,
    email,
    password: hashedPassword
  });

  res.status(201).json({
    message: 'User registered',
    userId: user._id
  });
};

const login = async (req, res) => {
  const db = req.app.locals.db;
  const userCollection = new UserModel(db);

  const { email, password } = req.body;
  const user = await userCollection.findByEmail(email);
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
};

module.exports = { register, login };
