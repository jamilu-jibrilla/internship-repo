var express = require('express');
var router = express.Router();
const Sequelize = require('sequelize');
let ShippingDock = require('../models/index');
ShippingDock = ShippingDock.shipping_dock
// Get all shipping docks


router.get('/', async (req, res) => {
    console.log(ShippingDock)
  const shippingDocks = await ShippingDock.findAll();
  res.json(shippingDocks);
});

// Get one shipping dock by id
router.get('/:id', async (req, res) => {
    const shippingDock = await ShippingDock.findByPk(req.params.id);
    if (shippingDock) {
      res.json(shippingDock);
    } else {
      res.status(404).send('Shipping dock not found');
    }
  });
  
  // Add a new shipping dock
  router.post('/', async (req, res) => {
    console.log(req.body, 'body')
    
    // Check if request body is empty
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Request body cannot be empty" });
    }
  
    try {
      const newShippingDock = await ShippingDock.create(req.body);
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
    const shippingDock = await ShippingDock.findByPk(req.params.id);
    if (shippingDock) {
      await shippingDock.update(req.body);
      res.json(shippingDock);
    } else {
      res.status(404).send('Shipping dock not found');
    }
  });
  
  // Delete a shipping dock
  router.delete('/:id', async (req, res) => {
    const shippingDock = await ShippingDock.findByPk(req.params.id);
    if (shippingDock) {
      await shippingDock.destroy();
      res.status(204).send();
    } else {
      res.status(404).send('Shipping dock not found');
    }
  });

module.exports = router;
