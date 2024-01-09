const nodemailer = require('nodemailer');
const { Op, Sequelize } = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const sequelize = require('../models/index').sequelize
const EmailQueue = require('../models/email_queue')(sequelize, DataTypes); 
const Email = require('../models/email')(sequelize, DataTypes); 
const User = require('../models/user')(sequelize, DataTypes); 
const moment = require('moment');
let transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "7e0f5ff82f6874",
    pass: "2e1ea9322b0f5d"
  }
});

const  sendMail = async () => {
    
    try {
    // find all emails in the queue for today
    let start = moment().startOf('day'); // set start date to start of today
    let end = moment().endOf('day'); // set end date to end of today
    
    const emailsToSendToday = await EmailQueue.findAll({
        where: {
          send_at: {
            [Op.between]: [start, end]
          }
        }
      })
  
    
      const users = await User.findAll({
        where: {
          id: {
            [Op.in]: emailsToSendToday.map(email => email.user_id)
          }
        },
        attributes: ['name', 'email']
      });
      

    users.map(async item => {
        main(item.email).catch(console.error);
    })

    for (let emailItem of emailsToSendToday) {
        const emailToUpdate = await EmailQueue.findOne({ where: { id: emailItem.id }});
        emailToUpdate.status = 'sent';
        await emailToUpdate.save();
    }

    } catch (err) {
        console.log(err)
    }
}

sendMail()

async function main() {
    const info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', 
      to: "jamilujibrilla01@gmail.com, baz@example.com", 
      subject: "Hello ✔", 
      text: "Hello world?", 
      html: "<b>Hello world?</b>",
    });
  
    console.log("Message sent: %s", info.messageId);
  }
  


