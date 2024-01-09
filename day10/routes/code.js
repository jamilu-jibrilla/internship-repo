const express = require('express');
const QRCode = require('qrcode');

const route = express.Router();

route.get('/', async (req, res) => {
  const code = Math.random().toString(36).substring(7);
  const url = `/api/v1/code/${code}?amount=1&service=software service`;
  
  try {
    const qrCode = await QRCode.toDataURL(url);
    res.send(`<a href="${url}"><img src="${qrCode}"></a>`);
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while generating QR code.');
  }
});

module.exports = route