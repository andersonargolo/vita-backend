// routes/terms.js
const express = require('express');
const router = express.Router();
const verifyAuth = require('../utils/verifyAuth');

router.post('/accept', verifyAuth, async (req, res) => {
  const { accepted } = req.body;
  const db = req.app.locals.db;

  try {
    await db.collection('terms_acceptance').doc(req.user.uid).set({
      accepted: !!accepted,
      acceptedAt: new Date().toISOString()
    });
    res.status(200).json({ message: 'Termo aceito com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar aceite do termo.' });
  }
});

router.get('/check', verifyAuth, async (req, res) => {
  const db = req.app.locals.db;
  const doc = await db.collection('terms_acceptance').doc(req.user.uid).get();
  if (!doc.exists) return res.status(200).json({ accepted: false });
  res.status(200).json(doc.data());
});

module.exports = router;
