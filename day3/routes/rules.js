var express = require('express');
const Sequelize = require('sequelize');
var router = express.Router();
const DataTypes = Sequelize.DataTypes;
const sequelize = require('../models/index').sequelize
let rules = require('../models/rules')(sequelize, DataTypes);;


router.get('/', async (req, res) => {
    try {
      const rule = await rules.findAll();
      res.json(rule);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


router.get('/:id', async (req, res) => {
    const ord = await rules.findByPk(req.params.id);
    if (ord) {
      res.json(ord);
    } else {
      res.status(404).send('rules not found');
    }
  });



  router.post('/', async (req, res) => {

    // Check if request body is empty
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body cannot be empty" });
    }
  
    try {
      const ord = await rules.create(req.body);
      res.status(201).json(ord);
    } catch (error) {
      // Handle Sequelize validation error
        return res.status(400).json({ error: "Validation Error: " + error.message });
      
      // Handle other errors
      return res.status(500).json({ error: "An error occurred while creating the shipping dock." });
    }
  });

    router.put('/:id', async (req, res) => {
        const ord = await rules.findByPk(req.params.id);
        if (ord) {
          await ord.update(req.body);
          res.json(ord);
        } else {
          res.status(404).send('rules not found');
        }
      });


  router.delete('/:id', async (req, res) => {
    const ord = await rules.findByPk(req.params.id);
    if (ord) {
      await ord.destroy();
      res.status(204).send();
    } else {
      res.status(404).send('rules not found');
    }
  });

      
  module.exports = router;
