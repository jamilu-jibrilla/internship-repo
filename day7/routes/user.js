var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../models/index').sequelize
const DataTypes = Sequelize.DataTypes;
let user = require('../models/user')(sequelize, DataTypes);



router.get('/', async (req, res) => {
  const ord = await user.findAll();
  res.json(ord);
});


router.get('/:id', async (req, res) => {
    const ord = await user.findByPk(req.params.id);
    if (ord) {
      res.json(ord);
    } else {
      res.status(404).send('user not found');
    }
  });



  router.post('/', async (req, res) => {

    // Check if request body is empty
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body cannot be empty" });
    }
  
    try {
      const ord = await user.create(req.body);
      res.status(201).json(ord);
    } catch (error) {
        return res.status(400).json({ error: "Validation Error: " + error.message });
      }
  });


    router.put('/:id', async (req, res) => {
        const ord = await user.findByPk(req.params.id);
        if (ord) {
          await ord.update(req.body);
          res.json(ord);
        } else {
          res.status(404).send('user not found');
        }
      });


  router.delete('/:id', async (req, res) => {
    const ord = await user.findByPk(req.params.id);
    if (ord) {
      await ord.destroy();
      res.status(204).send();
    } else {
      res.status(404).send('user not found');
    }
  });

      
  module.exports = router;
