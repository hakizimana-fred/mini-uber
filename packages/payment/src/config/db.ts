import { connect } from 'mongoose';

export const connectDB = async (mongoURI: string) => {
  try {
    await connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
