import cloudinary from '../config/cloudinary.js';

const deleteFromCloudinary = async (public_id, resource_type = 'image') => {
  const result = await cloudinary.uploader.destroy(public_id, {
    resource_type,
    invalidate: true,
  });

  if (result.result !== 'ok') {
    throw new Error(
      `Cloudinary delete failed for "${public_id}" (${resource_type}): ${result.result}`,
    );
  }

  return result;
};

export default deleteFromCloudinary;
