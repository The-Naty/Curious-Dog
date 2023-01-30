import { Question, User } from '@prisma/client';
import { pubsub, topicName } from '../pubsub';

export type QuestionCreated = {
  question: Question;
  receiver: User;
};

export type QuestionAnswered = {
  question: Question;
  asker: User | null;
};

export type QuestionEvents = QuestionCreated | QuestionAnswered;

export enum Event {
  QuestionCreated = 'QuestionCreated',
  QuestionAnswered = 'QuestionAnswered',
}

export async function publishNotification(eventType: Event, payload: QuestionEvents) {
  let topic = pubsub.topic(topicName);

  const data = Buffer.from(JSON.stringify({ eventType, ...payload }));

  topic.publishMessage({ data }, err => {
    if (err) {
      console.log('error publishing message', err);
    } else {
      console.log('message published');
    }
  });
}

export async function createTopicEvents() {
  const topic = pubsub.topic(topicName);

  const [topicExists] = await topic.exists();

  if (!topicExists) {
    await pubsub.createTopic(topicName);
  }
}
