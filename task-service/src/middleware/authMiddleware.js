const axios = require('axios');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ error: 'Token não fornecido.' });

  try {
    const response = await axios.get('http://localhost:3000/auth/verify', {
      headers: { Authorization: authHeader }
    });

    req.user = response.data.user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Autenticação inválida.' });
  }
};

module.exports = authMiddleware;
