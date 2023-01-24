import nodemailer from 'nodemailer';

export async function sendMail(receiverEmail: string, title: string, text: string, output: string) {
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: 'zanaty.dev@gmail.com',
      pass: process.env.USER_PASS,
    },
  });

  await transporter.sendMail({
    from: '"Curious Dog" <zanaty.dev@gmail.com>',
    to: receiverEmail,
    subject: title,
    text: text,
    html: output,
  });

  console.log('Mail sent');
}
