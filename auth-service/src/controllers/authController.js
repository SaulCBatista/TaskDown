const authService = require('../services/authService');

const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { user, token } = await authService.login(req.body.email, req.body.password);
    res.json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const verify = (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  const token = authHeader.split(' ')[1];
  console.log(token)
  const result = authService.verifyToken(token);

  if (!result.valid) {
    return res.status(401).json({ error: 'Token inválido ou expirado.' });
  }

  res.json({ user: result.payload });
};

module.exports = { register, login, verify };
