// utils/verifyAuth.js
const admin = require('firebase-admin');

module.exports = async function verifyAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token não enviado' });

  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('[VITA - Auth] Erro ao verificar token:', error.message);
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};
