import amqp from 'amqplib';
import 'dotenv/config';

class RideRequestProducer {
  private channel: any;
  private connection: any;

  async initialize() {
    this.connection = await amqp.connect(process.env.RABBITMQ_URL!);
    console.log('✅ RabbitMQ Connected Successfully');

    this.channel = await this.connection.createChannel();

    await this.channel.assertQueue('ride_requests', {
      durable: true,
    });
  }

  async publishRideRequest(rideData: {
    rideId: string;
    userId: string;
    pickup: {
      coordinates: [number, number];
    };
  }) {
    if (!this.channel) {
      console.log('⏳ Connecting to RabbitMQ before pushing to queue...');
      await this.initialize();
    }

    if (!this.channel) {
      console.error('❌ Failed to reinitialize channel. Exiting...');
      return;
    }

    try {
      console.log('Sent data to Queue');
      await this.channel.sendToQueue(
        'ride_requests',
        Buffer.from(JSON.stringify(rideData)),
        { persistent: true }
      );
      console.log('succes Sent data to Queue', rideData);
    } catch (error) {
      console.error('❌ Failed to send message to queue:', error);
    }
  }
}

const rideRequestProducer = new RideRequestProducer();
rideRequestProducer.initialize();

export { rideRequestProducer };
