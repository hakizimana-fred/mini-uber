import mongoose, { Schema } from 'mongoose';

export interface IRide {
  userId: mongoose.ObjectId;
  driverId?: string;
  status: 'requested' | 'accepted' | 'started' | 'completed' | 'cancelled';
  pickup: {
    location: {
      type: string;
      coordinates: [number, number];
    };
    address: string;
  };
  destination: {
    location: {
      type: string;
      coordinates: [number, number];
    };
    address: string;
  };
  requestedAt: Date;
  acceptedAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  estimatedPrice: number;
  finalPrice?: number;
  distance?: number;
  duration?: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
}

const RideSchema = new Schema<IRide>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  driverId: { type: Schema.Types.ObjectId, ref: 'User' },
  status: {
    type: String,
    enum: ['requested', 'accepted', 'started', 'completed', 'cancelled'],
    required: true,
  },
  pickup: {
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true },
    },
    address: { type: String, required: true },
  },
  destination: {
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true },
    },
    address: { type: String, required: true },
  },
  requestedAt: { type: Date, default: Date.now },
  acceptedAt: Date,
  startedAt: Date,
  completedAt: Date,
  cancelledAt: Date,
  estimatedPrice: { type: Number, required: true },
  finalPrice: Number,
  distance: Number,
  duration: Number,
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
});

RideSchema.index({ pickup: '2dsphere' });
RideSchema.index({ destination: '2dsphere' });
