const fs = require('fs');
const express = require('express')
const { generatePdf } = require('html-pdf-node');
const router = express.Router() 
const path = require('path');

let htmlPath = path.resolve(__dirname, '../invoice.html');
let html = fs.readFileSync(htmlPath, 'utf8');

router.get('/:code', async (req, res) => {
  const { amount, service } = req.query;
  let html = fs.readFileSync(htmlPath, 'utf8');
  html = html.replace('{amount}', amount).replace('{service}', service);
  
  try {
    let options = { format: 'A4' };
    const pdfBuffer = await generatePdf({ content: html }, options);
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfBuffer);
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while generating PDF.');
  }
});

module.exports = router
