import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const { MAIL_USER, PASS, MAIL_HOST, MAIL_SERVICE } = process.env;
const baseUrl = 'http://localhost:3000/users';

class Mail {
  private static sendMail = async (message: any): Promise<any> => {
    const transporter: any = nodemailer.createTransport({
      host: MAIL_HOST,
      service: MAIL_SERVICE,
      port: 465,
      secure: true,
      auth: {
        user: MAIL_USER,
        pass: PASS
      }
    });
    const info: any = await transporter.sendMail(message, (err: any) => {
      if (err) console.log('err', err);
    });
    return info;
  }

  public static signUpSuccess = (token: string, user: any): any => {
    const messageConstruct = {
      from: 'usersforum@testit.com',
      to: user.email,
      subject: 'Welcome to the Users Forum, Signup Successful',
      text: `Welcome to the Users Forum, Thank you for signing up.
      The next step is to verify this email
      address by clicking the link below.
      >>>
      ${baseUrl}/${token}><<< `,
      html: `<div style="border: solid 1px blue, border-radius: 4px">
      <p>Hi ${user.username}, Welcome to the Users Forum</p>
      <p>Thank you for signing up.</p>
      <p>The next step is to verify this email
      address by clicking the link below.</p>
      <p> >>>
      <a href=${baseUrl}/${token}>
      Complete your registration </a><<< </p>
      </div>`
    };
    return Mail.sendMail(messageConstruct);
  }

}

export default Mail;
