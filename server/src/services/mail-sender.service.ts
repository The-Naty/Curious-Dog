import { PubSub } from '@google-cloud/pubsub';

export async function publishNotification(messageData: any, messageType: string, receiverInfo?: any) {
  const projectId = 'curious-dog-371019';
  const topicName = 'curious-dog-dev-topic';
  const pubsub = new PubSub({ projectId });
  let topic = pubsub.topic(topicName);

  const [topicExists] = await topic.exists();

  if (!topicExists) {
    [topic] = await pubsub.createTopic(topicName);
    console.log(`Topic created ${topicName}`);
  } else {
    console.log(`Topic exists ${topicName}`);
  }
  const message = { type: messageType, messageData, receiverInfo: receiverInfo };
  console.log(message);

  const data = Buffer.from(JSON.stringify(message));

  topic.publishMessage({ data }, err => {
    if (err) {
      console.log('error publishing message', err);
    } else {
      console.log('message published');
    }
  });

  console.log(`Topic ${topic.name} created.`);
}
