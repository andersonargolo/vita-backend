// routes/auth.js
const express = require('express');
const router = express.Router();
const verifyAuth = require('../utils/verifyAuth');

router.get('/me', verifyAuth, async (req, res) => {
  const user = req.user;
  res.status(200).json({
    uid: user.uid,
    email: user.email,
    name: user.name || '',
  });
});

module.exports = router;
