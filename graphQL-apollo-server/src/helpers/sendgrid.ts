/// <reference path='../types/sendgrid.d.ts'/>
import sendGrid from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();
const { SENDGRID_API_KEY } = process.env;

const message: any = {
  to: 'oluwasegunadepoju@gmail.com',
  from: 'test@andela.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

const sendMail: any = async () => {
  await sendGrid.setApiKey(SENDGRID_API_KEY);
  await sendGrid.send(message);
};

export default sendMail;
