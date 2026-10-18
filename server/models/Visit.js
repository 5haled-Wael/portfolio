import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema(
  {},
  { timestamps: { createdAt: true, updatedAt: false } },
);

const Visit = mongoose.model('Visit', visitSchema);

export default Visit;
