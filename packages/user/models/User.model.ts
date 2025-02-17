import { Schema, model } from 'mongoose';
{
}

interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: USERROLe;
  vehicleInfo: Vehicle;
  isAvailable: boolean;
  currentLocation: Location;
}

type Vehicle = {
  model: string;
  year: number;
  plateNumber: string;
  color: string;
};

type Location = {
  type: string;
  coordinates: [number, number];
};

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
