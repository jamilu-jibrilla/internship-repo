var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const sequelize = require('../models/index').sequelize
let email = require('../models/email')(sequelize, DataTypes);


router.get('/', async (req, res) => {
  const e = await email.findAll();
  res.json(e);
});


router.get('/:id', async (req, res) => {
    const ord = await email.findByPk(req.params.id);
    if (ord) {
      res.json(ord);
    } else {
      res.status(404).send('email not found');
    }
  });



  router.post('/', async (req, res) => {

    // Check if request body is empty
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body cannot be empty" });
    }
  
    try {
      const ord = await email.create(req.body);
      res.status(201).json(ord);
    } catch (error) {
      // Handle Sequelize validation error
        return res.status(400).json({ error: "Validation Error: " + error.message });
      
    }
  });

   // Update a shipping dock
    router.put('/:id', async (req, res) => {
        const ord = await email.findByPk(req.params.id);
        if (ord) {
          await ord.update(req.body);
          res.json(ord);
        } else {
          res.status(404).send('email not found');
        }
      });


  // Delete a shipping dock
  router.delete('/:id', async (req, res) => {
    const ord = await email.findByPk(req.params.id);
    if (ord) {
      await ord.destroy();
      res.status(204).send();
    } else {
      res.status(404).send('email not found');
    }
  });

      
  module.exports = router;
