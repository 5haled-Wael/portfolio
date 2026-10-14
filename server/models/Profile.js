import mongoose from 'mongoose';

const fileSchema = {
  url: { type: String, required: true },
  public_id: { type: String, required: true },
};

const profileSchema = new mongoose.Schema(
  {
    singletonKey: {
      type: String,
      default: 'main',
      immutable: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    subtitle: {
      type: String,
      required: true,
      trim: true,
    },
    about: {
      type: String,
      required: true,
      trim: true,
    },
    image: fileSchema,
    cv: fileSchema,
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email'],
    },
    linkedin: {
      type: String,
      required: true,
      trim: true,
    },
    github: {
      type: String,
      required: true,
      trim: true,
    },
    university: {
      type: String,
      required: true,
      trim: true,
    },
    graduation: {
      type: Number,
      required: true,
      min: 2000,
      max: 2100,
    },
  },
  { timestamps: true },
);

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
