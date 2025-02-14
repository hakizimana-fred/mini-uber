import { connect } from 'mongoose';

export const connectDB = async (mongoURI: string) => {
  try {
    await connect(mongoURI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
