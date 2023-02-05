import { sendMail } from './nodemailer';
import { getQuestionAnsweredTemplate, getQuestionCreatedTemplate, getUserRegisterTemplate } from './template.service';

export const handleEvent = async (message: string) => {
  const event = JSON.parse(message);

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

    case 'UserRegister': {
      if (event.user) {
        const title = 'Welcome ' + event.user.username;
        const userEmail = event.user.email;
        const html = getUserRegisterTemplate(event);

        await sendMail(userEmail, title, html);
      }

      break;
    }

    default: {
      console.log('error while sending mail.');

      break;
    }
  }
};
