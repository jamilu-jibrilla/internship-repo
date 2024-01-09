const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const sequelize = require('../models/index').sequelize
const Quiz = require('../models/quiz')(sequelize, DataTypes);


router.get('/', async (req, res) => {
  try {
    const quizData = await Quiz.findAll();
    res.json(quizData);
  } catch (err) {
      console.log(err)
    res.status(500).json(err);
  }
});

router.post('/quizzes', async (req, res) => {
    try {
      const quizzes = req.body;
      
      for (let quizData of quizzes) {
        await Quiz.create(quizData);
      }
  
      res.status(200).json({ message: 'Quizzes created successfully' });
    } catch(err) {
      res.status(500).json({ error: err.message });
    }
  });

router.post('/', async (req, res) => {
    try {
      const quizData = await Quiz.create(req.body);
      res.status(201).json(quizData);
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
  });
  


router.put('/:id', async (req, res) => {
    try {
      const quizData = await Quiz.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
  
      if (!quizData) {
        res.status(404).json({ message: 'No quiz found with this id!' });
        return;
      }
  
      res.json(quizData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

module.exports = router;
