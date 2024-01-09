const express = require('express')
const Sequelize = require('sequelize')
const sequelize = require('../models/index').sequelize
const DataTypes = Sequelize.DataTypes
const { exec } = require('child_process');
const Customer = require('../models/customer')(sequelize, DataTypes)

let shopifyCommand = 'curl -s -X GET -H "Content-Type: application/json" -H "X-Shopify-Access-Token: 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" "https://jamil-jb.myshopify.com/admin/api/2022-10/customers.json"';

exec(shopifyCommand, (error, stdout, stderr) => {
  if(stderr){
      console.error(`exec error: ${stderr}`);
      return;
  }

  const customers = JSON.parse(stdout).customers;
  
  if(!customers) return;

  for (let customer of customers) {
    Customer.findOne({ where: { shopify_customer_id: customer.id } })
      .then(existingCustomer => {
        if (!existingCustomer) {
          Customer.create({
            shopify_customer_id: customer.id,
            shopify_customer_email: customer.email,
          });
        }
      });
  }
});
