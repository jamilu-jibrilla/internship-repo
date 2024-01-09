const express = require('express')
const router = express.Router();
const path = require('path')


/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

router.get('/text', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'text.html'));
});

router.get('/image', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'image.html'));
});

router.get('/element', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'element.html'));
});

module.exports = router