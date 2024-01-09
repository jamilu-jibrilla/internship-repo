let express = require('express')
let router = express.Router()
const csv = require('csv-parser');
const fs = require('fs');
const multer  = require('multer');
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const sequelize = require('../models/index').sequelize
let transaction = require('../models/transaction')(sequelize, DataTypes);
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');
const upload = multer({ dest: 'tmp/csv/' });

router.post('/import', upload.single('file'), (req, res) => {
  const results = [];

  fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
          transaction.bulkCreate(results)
          .then(() => {
            console.log('Transactions created');
          })
          .catch(error => {
            console.error('Error occurred:', error);
          });      
      });
  });

  router.get('/export', async (req, res) => {
    const transactions = await transaction.findAll();
    
    const csvWriter = createCsvWriter({
      path: 'export.csv',
      header: [
        {id: 'id', title: 'ID'},
        {id: 'order_id', title: 'ORDER_ID'},
        {id: 'amount', title: 'AMOUNT'},
        {id: 'discount', title: 'DISCOUNT'},
        {id: 'tax', title: 'TAX'},
        {id: 'total', title: 'TOTAL'},
      ]
    });
  
    csvWriter.writeRecords(transactions)
    .then(() => {
      const filePath = path.resolve(__dirname, 'export.csv');
      res.download(filePath);

    })
    .catch(err => {
      console.error(err);
      res.sendStatus(500);
    });
  });
  

module.exports = router