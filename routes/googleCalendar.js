// routes/googleCalendar.js
const express = require('express');
const router = express.Router();
const { google } = require('googleapis');

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// GET /api/google-calendar/auth-url
router.get('/auth-url', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar'],
    prompt: 'consent'
  });

  res.json({ url: authUrl });
});

module.exports = router;
