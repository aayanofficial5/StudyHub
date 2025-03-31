const nodemailer = require('nodemailer');
const SendmailTransport = require('nodemailer/lib/sendmail-transport');
require('dotenv').config();
const {MAIL_HOST,MAIL_USER,MAIL_PASS} = process.env;

const mailSender = async (email,title,body)=>{
  try{
  const transporter = nodemailer.createTransport({
    host: MAIL_HOST,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS,
      }
  });

  const info = await transporter.sendMail({
    from : 'StudyHub - by Aayan Patel',
    to : `${email}`,
    subject : `${title}`,
    html:`${body}`
  })

  }catch(error){
    console.log("An Error Occurred : "+error.message);
    throw error;
  }
}

module.exports = mailSender;