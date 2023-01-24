import { sendMail } from './nodemailer';
import { html } from './html';

export const checkMailType = (message: string) => {
  const event = JSON.parse(message);

  switch (event.type) {
    case 'QuestionCreated': {
      const receiverEmail = event.receiverInfo.email;

      sendMail(receiverEmail, 'Someone wants to know more about you!', 'You got new question', html);

      break;
    }
    case 'QuestionAnswered': {
      const title = event.receiverInfo.username + ' answered your question!';
      const receiverEmail = event.receiverInfo.email;

      sendMail(receiverEmail, title, 'Your question answered', html);
      break;
    }
    default: {
      console.log('error while sending mail.');

      break;
    }
  }
};
