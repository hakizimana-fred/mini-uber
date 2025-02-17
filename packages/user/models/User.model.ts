import { Schema, model } from 'mongoose';
{
}

interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: USERROLe;
}

enum USERROLe {
  user,
  rider,
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
  role: {
    type: String,
    enum: ['user', 'rider'],
    default: 'user',
  },
  currentLocation: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] },
  },
  vehicleInfo: {
    model: String,
    year: Number,
    plateNumber: String,
    color: String,
  },
  isAvailable: { type: Boolean, default: true },
});

userSchema.index({ currentLocation: '2dsphere' });

export default model<UserDocument>('User', userSchema);
{
}
