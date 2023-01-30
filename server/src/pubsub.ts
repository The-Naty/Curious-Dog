import { PubSub } from '@google-cloud/pubsub';

const projectId = process.env.PROJECTID;

export const topicName = 'curious-dog-dev-topic';
export const pubsub = new PubSub({ projectId });
