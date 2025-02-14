import { Schema, model } from 'mongoose';
{
}

interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default model<UserDocument>('User', userSchema);
{
}
