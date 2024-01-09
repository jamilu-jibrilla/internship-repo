const nodemailer = require('nodemailer');
const { Op, Sequelize } = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const sequelize = require('../models/index').sequelize
const EmailQueue = require('../models/email_queue')(sequelize, DataTypes); 
const Email = require('../models/email')(sequelize, DataTypes); 
const User = require('../models/user')(sequelize, DataTypes); 
const moment = require('moment');

// ```
// 1.Loop through all email_queue table that have send_at as today.
// 2.Query user table to collect email and name.
// In email template selected, replace {{{NAME}}} and {{{EMAIL}}} with user email and name.
// 3.Send email to user. Use https://mailtrap.io/ to send the email
// 4.Mark Email status as sent
// ```

// create reusable transporter object using the default SMTP transport
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
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "jamilujibrilla01@gmail.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    //
    // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
    //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
    //       <https://github.com/forwardemail/preview-email>
    //
  }
  
//   main().catch(console.error);


