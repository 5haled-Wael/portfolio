import Profile from '../models/Profile.js';
import uploadToCloudinary from '../utils/uploadToCloudinary.js';
import deleteFromCloudinary from '../utils/deleteFromCloudinary.js';

const getProfile = async (req, res) => {
  const profile = await Profile.findOne({ singletonKey: 'main' });

  if (!profile) {
    res.status(404);
    throw new Error('Profile not found');
  }

  res.status(200).json(profile);
};

const updateProfile = async (req, res) => {
  const {
    name,
    title,
    subtitle,
    about,
    email,
    linkedin,
    github,
    university,
    graduation,
  } = req.body;

  const graduationNumber = Number(graduation);

  if (
    !name?.trim() ||
    !title?.trim() ||
    !subtitle?.trim() ||
    !about?.trim() ||
    !email?.trim() ||
    !linkedin?.trim() ||
    !github?.trim() ||
    !university?.trim() ||
    graduation === undefined ||
    graduation === '' ||
    Number.isNaN(graduationNumber)
  ) {
    res.status(400);
    throw new Error('Missing or invalid required fields');
  }

  const existingProfile = await Profile.findOne({ singletonKey: 'main' });

  const image = req.files?.image?.[0];
  const cv = req.files?.cv?.[0];

  if (!existingProfile && (!image || !cv)) {
    res.status(400);
    throw new Error('Image and CV are required for initial setup');
  }

  const uploadedFiles = [];
  const oldFiles = [];

  try {
    const profileData = {
      name,
      title,
      subtitle,
      about,
      email,
      linkedin,
      github,
      university,
      graduation: graduationNumber,
    };

    if (image) {
      const result = await uploadToCloudinary(image.buffer, {
        folder: 'portfolio/profile',
      });

      uploadedFiles.push({ publicId: result.public_id, resourceType: 'image' });

      profileData.image = {
        url: result.secure_url,
        public_id: result.public_id,
      };

      if (existingProfile?.image?.public_id) {
        oldFiles.push({
          publicId: existingProfile.image.public_id,
          resourceType: 'image',
        });
      }
    }

    if (cv) {
      const result = await uploadToCloudinary(cv.buffer, {
        folder: 'portfolio/cv',
        resource_type: 'raw',
        public_id: `khaled-cv-${Date.now()}.pdf`,
      });

      uploadedFiles.push({ publicId: result.public_id, resourceType: 'raw' });

      profileData.cv = {
        url: result.secure_url,
        public_id: result.public_id,
      };

      if (existingProfile?.cv?.public_id) {
        oldFiles.push({
          publicId: existingProfile.cv.public_id,
          resourceType: 'raw',
        });
      }
    }

    const profile = await Profile.findOneAndUpdate(
      { singletonKey: 'main' },
      { $set: profileData },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      },
    );

    for (const { publicId, resourceType } of oldFiles) {
      try {
        await deleteFromCloudinary(publicId, resourceType);
      } catch (error) {
        console.error('Failed to delete replaced Cloudinary file:', error);
      }
    }

    res.status(200).json(profile);
  } catch (error) {
    for (const { publicId, resourceType } of uploadedFiles) {
      try {
        await deleteFromCloudinary(publicId, resourceType);
      } catch (cleanupError) {
        console.error(
          'Failed to clean up uploaded Cloudinary file:',
          cleanupError,
        );
      }
    }

    throw error;
  }
};

export { getProfile, updateProfile };
