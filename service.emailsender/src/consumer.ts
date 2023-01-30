import { PubSub, Message } from '@google-cloud/pubsub';
import { handleEvent } from './mail-sender.service';

const main = async () => {
  const projectId = process.env.PROJECTID;
  const pubsub = new PubSub({ projectId });

  const topicName = 'curious-dog-dev-topic';
  const subscriptionName = 'curious-dog-dev-notification-subscrption';

  let topic = pubsub.topic(topicName);

  let subscription = topic.subscription(subscriptionName);

  const [subscriptionExists] = await subscription.exists();

  if (!subscriptionExists) {
    [subscription] = await topic.createSubscription(subscriptionName);
    console.log(`Subscription created ${topicName}`);
  } else {
    console.log(`Subscription exists ${topicName}`);
  }

  subscription.on('message', async (message: Message) => {
    const data = message.data.toString();

    try {
      await handleEvent(data);
      message.ack();
    } catch (err) {
      message.nack();
    }
  });

  subscription.on('error', error => {
    console.error('Received error:', error);
    process.exit(1);
  });
};

main();
