import { readFileSync } from 'fs';
import path from 'path';
import Mustache from 'mustache';

export type QuestionCreatedEvent = {
  question: { id: number };
  receiver: { email: string; username: string };
};

export type QuestionAnsweredEvent = {
  question: { id: number };
  asker: { email: string; username: string };
};

export const getQuestionCreatedTemplate = (event: QuestionCreatedEvent) => {
  const htmlPath = path.join(__dirname, 'notification-template.html');
  const html = readFileSync(htmlPath, { encoding: 'utf8' });
  return Mustache.render(html, { description: 'Someone asked you a new question.', link: `http://localhost:3000/questions/${event.question.id}` });
};

export const getQuestionAnsweredTemplate = (event: QuestionAnsweredEvent) => {
  const htmlPath = path.join(__dirname, 'notification-template.html');
  const html = readFileSync(htmlPath, { encoding: 'utf8' });
  return Mustache.render(html, { description: 'Someone answered your question.', link: `http://localhost:3000/questions/${event.question.id}` });
};
