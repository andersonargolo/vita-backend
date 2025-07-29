// routes/reminders.js
const express = require('express');
const router = express.Router();
const verifyAuth = require('../utils/verifyAuth');
const axios = require('axios');

router.post('/', verifyAuth, async (req, res) => {
  const { client } = req.body;

  const phone = client.phoneNumber.replace(/\D/g, '');
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const version = process.env.WHATSAPP_API_VERSION;

  const url = `https://graph.facebook.com/${version}/${phoneId}/messages`;

  const data = {
    messaging_product: "whatsapp",
    to: phone,
    type: "template",
    template: {
      name: process.env.WHATSAPP_REMINDER_TEMPLATE_NAME,
      language: { code: "pt_BR" },
      components: [{
        type: "body",
        parameters: [
          { type: "text", text: client.name },
          { type: "text", text: client.date },
          { type: "text", text: client.time }
        ]
      }]
    }
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    res.status(200).json({ message: 'Lembrete enviado com sucesso', response: response.data });
  } catch (error) {
    console.error('[VITA] Erro ao enviar WhatsApp:', error.message);
    res.status(500).json({ error: 'Erro ao enviar lembrete' });
  }
});

module.exports = router;
