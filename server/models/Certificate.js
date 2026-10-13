import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  issuer: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  images: [
    {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
  ],
  order: {
    type: Number,
    default: 0,
  },
});

const Certificate = mongoose.model('Certificate', certificateSchema);

export default Certificate;
