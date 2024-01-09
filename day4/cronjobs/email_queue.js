var express = require('express');
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const sequelize = require('../models/index').sequelize
const moment = require('moment');
const Op = Sequelize.Op;

let User = require('../models/user')(sequelize, DataTypes);
let Email = require('../models/email')(sequelize, DataTypes);
let EmailQueue = require('../models/email_queue')(sequelize, DataTypes);

// 1.Loop through all active users
// 2.Loop through all odd id emails if today is monday, wednesday, friday. Otherwise do all even id for other days.
// 4.Loop through all the users in user table and make a table of user_id.
// 3.Write into email queue for each user in step 2 (so if 3 total emails, 2 ids are odd, say there 5 users so on monday you add 2 x 5 = 10 emails into email_queue.) what email to send from step 2. Set status as not sent. Set send_at as next day.

async function emailQueue() {
  // Get all active users
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