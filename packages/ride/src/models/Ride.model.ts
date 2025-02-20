import mongoose, { Schema, model } from 'mongoose';

export interface IRide {
  userId: mongoose.ObjectId;
  driverId?: string;
  status: 'requested' | 'accepted' | 'started' | 'completed' | 'cancelled';
  pickup: Location;
  destination: Location;
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

type Location = {
  type: string;
  coordinates: [number, number];
};

const RideSchema = new Schema<IRide>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  driverId: { type: Schema.Types.ObjectId, ref: 'User' },
  status: {
    type: String,
    enum: ['requested', 'accepted', 'started', 'completed', 'cancelled'],
    required: true,
  },
  pickup: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] },
  },
  destination: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] },
  },

  requestedAt: { type: Date, default: Date.now },
  acceptedAt: Date,
  startedAt: Date,
  completedAt: Date,
  cancelledAt: Date,
  estimatedPrice: { type: Number, required: false },
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

export default model('Ride', RideSchema);
