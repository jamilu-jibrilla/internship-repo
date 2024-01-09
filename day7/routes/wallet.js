const express = require('express');
const Web3Service = require('../services/web3service');
const router = express();
const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes
const sequelize = require('../models/index').sequelize
const User = require('../models/user')(sequelize, DataTypes)

const web3Service = new Web3Service();

router.post('/wallet', async (req, res) => {
  try {
    const user = await User.findByPk(req.body.user_id);
    if(!user) {
        res.send('no user found with this id')
        return
    }
    const account = web3Service.createAccount();
    user.update({
        wallet_id: account.address
    })
    res.json({ privateKey: account.privateKey });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


router.get('/sign', (req, res) => {
    const privateKey = req.query.private_key;

    if (!privateKey) {
        return res.status(400).json({ error: 'Private key query parameter is required' });
    }

    const account = web3Service.generateAccountFromPrivateKey(privateKey);
    const signature = web3Service.signData(account);

    res.json({
        address: account.address,
        signature: signature.signature
    });


});



router.get('/account', async (req, res) => {
  try {
    const balance = await web3Service.getBalance(req.query.private_key);
    res.json({ balance });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router


