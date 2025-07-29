// routes/appointments.js
const express = require('express');
const router = express.Router();
const verifyAuth = require('../utils/verifyAuth');
const { encrypt, decrypt } = require('../utils/crypto');

router.post('/', verifyAuth, async (req, res) => {
  const db = req.app.locals.db;
  const { client } = req.body;

  try {
    const encryptedClient = {
      ...client,
      anamnesis: encrypt(client.anamnesis),
      reports: encrypt(client.reports),
      treatmentEvolution: encrypt(client.treatmentEvolution)
    };

    await db
      .collection('users')
      .doc(req.user.uid)
      .collection('clients')
      .doc(client.id)
      .set(encryptedClient);

    res.status(200).json({ message: 'Cliente salvo com sucesso.' });
  } catch (error) {
    console.error('[VITA] Erro ao salvar cliente:', error.message);
    res.status(500).json({ error: 'Erro ao salvar cliente.' });
  }
});

router.get('/', verifyAuth, async (req, res) => {
  const db = req.app.locals.db;
  try {
    const snapshot = await db
      .collection('users')
      .doc(req.user.uid)
      .collection('clients')
      .get();

    const clients = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        anamnesis: decrypt(data.anamnesis),
        reports: decrypt(data.reports),
        treatmentEvolution: decrypt(data.treatmentEvolution)
      };
    });

    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar clientes.' });
  }
});

module.exports = router;
