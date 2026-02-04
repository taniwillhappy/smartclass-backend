const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, password, fullname } = req.body;

  const hash = await bcrypt.hash(password, 10);

  await pool.query(
    'INSERT INTO teachers (username, password, fullname) VALUES ($1,$2,$3)',
    [username, hash, fullname]
  );

  res.json({ message: 'Register success' });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const result = await pool.query(
    'SELECT * FROM teachers WHERE username=$1',
    [username]
  );

  if (result.rows.length === 0)
    return res.status(401).json({ message: 'User not found' });

  const user = result.rows[0];
  const match = await bcrypt.compare(password, user.password);

  if (!match)
    return res.status(401).json({ message: 'Wrong password' });

  const token = jwt.sign(
    { id: user.id, fullname: user.fullname },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
};

exports.dashboard = (req, res) => {
  res.json({
    message: 'Welcome to dashboard',
    user: req.user
  });
};
