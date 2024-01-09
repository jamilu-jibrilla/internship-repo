var express = require('express');
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const sequelize = require('../models/index').sequelize
const moment = require('moment');
const Op = Sequelize.Op;

let User = require('../models/user')(sequelize, DataTypes);
let Email = require('../models/email')(sequelize, DataTypes);
let EmailQueue = require('../models/email_queue')(sequelize, DataTypes);

async function emailQueue() {
  try {
    const activeUsers = await User.findAll({ where: { status: 1} });
    const users = await User.findAll();

    // Check if today is Monday, Wednesday, or Friday
    const today = moment().format('dddd');
    const isMWF = ['Monday', 'Wednesday', 'Friday'].includes(today);
    
    // Get emails based on the day
    let emails;
    if (isMWF) {
      // Get odd id emails
      emails = await sequelize.query("SELECT * FROM `email` WHERE MOD(`id`, 2) = 1", { type: sequelize.QueryTypes.SELECT});
    } else {
      // Get even id emails
      emails = await sequelize.query("SELECT * FROM `email` WHERE MOD(`id`, 2) = 0", { type: sequelize.QueryTypes.SELECT});
    }
  
    
    // Loop through all the users and emails and write into email queue
    for (let user of activeUsers) {
        for (let email of emails) {
        // Write into email queue
        await EmailQueue.create({
            email_id: email.id,
            user_id: user.id,
            status: 2,
            send_at: moment().add(1, 'day').toDate()
        });
        }
    }



  } catch (err) {
    console.log(err, 'the error')
  }

}

emailQueue()