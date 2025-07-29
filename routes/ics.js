// routes/ics.js
const express = require('express');
const router = express.Router();
const verifyAuth = require('../utils/verifyAuth');

router.get('/download', verifyAuth, (req, res) => {
  const { date, time, name, location } = req.query;

  const dtStart = `${date.replace(/-/g, '')}T${time.replace(':', '')}00`;
  const end = new Date(`${date}T${time}`);
  const dtEnd = new Date(end.getTime() + 30 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0];

  const content = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:Consulta de massoterapia
DTSTART:${dtStart}
DTEND:${dtEnd}
DESCRIPTION:Consulta com ${name}
LOCATION:${location || 'Clínica'}
END:VEVENT
END:VCALENDAR`.trim();

  res.setHeader('Content-Type', 'text/calendar');
  res.setHeader('Content-Disposition', `attachment; filename="consulta-${date}.ics"`);
  res.send(content);
});

module.exports = router;
