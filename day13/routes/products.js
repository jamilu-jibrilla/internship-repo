const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const sequelize = require('../models/index').sequelize
const Product = require('../models/products')(sequelize, DataTypes);
const Order = require('../models/order')(sequelize, DataTypes);
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.get('/thank-you', async (req, res) => {
  try {
    const {session_id} = req.query
    const session = await stripe.checkout.sessions.retrieve(session_id)
    console.log(session, 'session')

    const order = await Order.create({
      total: session.amount_total / 100, 
      stripe_id: session.payment_intent,
      status: 'paid',
      product_id: uuidv4(),
    });
    console.log(order, 'order')
    res.render('order', { order });
  } catch(err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
})


router.get('/', async (req, res) => {
    Product.findAll()
    .then(products => {
      res.render('products', { products });
    })
    .catch(err => console.error(err));
  });

  
router.get('/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findByPk(productId);
      res.render('product', { product });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  router.post('/create-checkout-session', async (req, res) => {
    try {
    const {productId, quantity} = req.body
    const product = await Product.findByPk(productId)
    console.log(productId, 'product id')
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.title,
            },
            unit_amount: 1 * 100,
          },
          quantity,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.BASE_URL}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/product/${productId}`,
    })
    res.json({ id: session.id });
  } catch(err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  })



  module.exports = router