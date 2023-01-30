import { title } from 'process';
import { sendMail } from './nodemailer';
import { getQuestionAnsweredTemplate, getQuestionCreatedTemplate } from './template.service';

export const handleEvent = async (message: string) => {
  const event = JSON.parse(message);
  console.log(event);

  switch (event.eventType) {
    case 'QuestionCreated': {
      if (event.receiver) {
        const title = 'Someone wants to know more about you!';
        const receiverEmail = event.receiver.email;
        const html = getQuestionCreatedTemplate(event);
        await sendMail(receiverEmail, title, html);
      }

      break;
    }
    case 'QuestionAnswered': {
      if (event.asker) {
        const title = event.asker.username + ' answered your question!';
        const askerEmail = event.asker.email;
        const html = getQuestionAnsweredTemplate(event);

        await sendMail(askerEmail, title, html);
      }

      break;
    }
    default: {
      console.log('error while sending mail.');

      break;
    }
  }
};
