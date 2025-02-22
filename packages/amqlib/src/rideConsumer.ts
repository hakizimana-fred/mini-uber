import amqp from 'amqplib';
import 'dotenv/config';
import mongoose from 'mongoose';

export class RideMatchingConsumer {
  private channel: any;

  async connectToMongo() {
    try {
      await mongoose.connect(process.env.MONGO_URI!, {
        serverSelectionTimeoutMS: 15000, // Increase timeout if needed
        connectTimeoutMS: 15000,
        socketTimeoutMS: 30000,
      });

      mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
      });

      mongoose.connection.on('connected', () => {
        console.log('Successfully connected to MongoDB');
      });
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      throw error;
    }
  }

  async initialize() {
    const connection = await amqp.connect(process.env.RABBITMQ_URL!);
    this.channel = await connection.createChannel();

    await this.channel.assertQueue('ride_requests', { durable: true });

    this.channel.prefetch(1);

    console.log('Ride matching consumer initialized, waiting for messages...');
  }

  async startConsuming() {
    await this.channel.consume('ride_requests', async (msg: any) => {
      if (!msg) return;

      if (!this.channel) {
        console.log('⏳ Connecting to RabbitMQ before pushing to queue...');
        await this.initialize();
      }

      if (!this.channel) {
        console.error('❌ Failed to reinitialize channel. Exiting...');
        return;
      }

      try {
        const rideRequest = JSON.parse(msg.content.toString());
        console.log(`Processing ride request ${rideRequest.rideId}`);

        console.log('you ride has been requested!!!');

        this.channel.ack(msg);
      } catch (error) {
        console.error('Error processing ride request:', error);
        this.channel.nack(msg, false, false);
      }
    });
  }
}

async function startMatchingService() {
  const consumer = new RideMatchingConsumer();
  await consumer.initialize();
  await consumer.connectToMongo();
  await consumer.startConsuming();
}

startMatchingService().catch(console.error);
