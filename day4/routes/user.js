var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
const sequelize = require('../models/index').sequelize
const DataTypes = Sequelize.DataTypes;
let user = require('../models/user')(sequelize, DataTypes);


// Get all shipping docks
router.get('/', async (req, res) => {
  const ord = await user.findAll();
  res.json(ord);
});


// Get one shipping dock by id
router.get('/:id', async (req, res) => {
    const ord = await user.findByPk(req.params.id);
    if (ord) {
      res.json(ord);
    } else {
      res.status(404).send('user not found');
    }
  });



  // Add a new shipping dock
  router.post('/', async (req, res) => {

    // Check if request body is empty
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body cannot be empty" });
    }
  
    try {
      const ord = await user.create(req.body);
      res.status(201).json(ord);
    } catch (error) {
      // Handle Sequelize validation error
        return res.status(400).json({ error: "Validation Error: " + error.message });
      
      // Handle other errors
      return res.status(500).json({ error: "An error occurred while creating the shipping dock." });
    }
  });

   // Update a shipping dock
    router.put('/:id', async (req, res) => {
        const ord = await user.findByPk(req.params.id);
        if (ord) {
          await ord.update(req.body);
          res.json(ord);
        } else {
          res.status(404).send('user not found');
        }
      });


  // Delete a shipping dock
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
