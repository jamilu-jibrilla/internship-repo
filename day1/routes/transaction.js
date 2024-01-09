var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
let transaction = require('../models/index');
transaction = transaction.transaction

// Get all shipping docks
router.get('/', async (req, res) => {
    console.log(transaction)
  const transact = await transaction.findAll();
  res.json(transact);
});

// Get one shipping dock by id
router.get('/:id', async (req, res) => {
    const transact = await transaction.findByPk(req.params.id);
    if (transact) {
      res.json(transact);
    } else {
      res.status(404).send('transaction  not found');
    }
  });
  
  // Add a new shipping dock
  router.post('/', async (req, res) => {
    
    // Check if request body is empty
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body cannot be empty" });
    }
  
    try {
      const newShippingDock = await transaction.create(req.body);
      res.status(201).json(newShippingDock);
    } catch (error) {
      // Handle Sequelize validation error
        return res.status(400).json({ error: "Validation Error: " + error.message });
      
      // Handle other errors
      return res.status(500).json({ error: "An error occurred while creating the shipping dock." });
    }
  });
  
  
  // Update a shipping dock
  router.put('/:id', async (req, res) => {
    const transact = await transaction.findByPk(req.params.id);
    if (transact) {
      await transact.update(req.body);
      res.json(transact);
    } else {
      res.status(404).send('transaction  not found');
    }
  });
  
  // Delete a shipping dock
  router.delete('/:id', async (req, res) => {
    const transact = await transaction.findByPk(req.params.id);
    if (transact) {
      await transact.destroy();
      res.status(204).send();
    } else {
      res.status(404).send('transaction  not found');
    }
  });

module.exports = router;
