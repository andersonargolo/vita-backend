// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Firebase Admin
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH;

if (!serviceAccountPath || !fs.existsSync(serviceAccountPath)) {
  console.error('[ERRO] Firebase Service Account JSON não encontrado.');
  process.exit(1);
}

const serviceAccount = require(serviceAccountPath);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
  });
  console.log('[VITA] Firebase Admin SDK inicializado.');
}

const db = admin.firestore();
app.locals.db = db;
app.locals.admin = admin;

// Rotas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/terms', require('./routes/terms'));
app.use('/api/appointments', require('./routes/appointments'));
app.use('/api/reminders', require('./routes/reminders'));
app.use('/api/ics', require('./routes/ics'));

// Rota raiz
app.get('/', (req, res) => {
  res.send('API Vita - Backend funcionando com sucesso 🚀');
});

// Inicia servidor
app.listen(PORT, () => {
  console.log(`[VITA] Backend rodando em http://localhost:${PORT}`);
});
