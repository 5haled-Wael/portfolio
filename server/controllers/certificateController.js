import Certificate from '../models/Certificate.js';
import deleteFromCloudinary from '../utils/deleteFromCloudinary.js';
import uploadToCloudinary from '../utils/uploadToCloudinary.js';

const getCertificates = async (req, res) => {
  const certificates = await Certificate.find().sort({ order: 1 });
  res.status(200).json(certificates);
};

const getCertificate = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400);
    throw new Error('Missing id');
  }

  const certificate = await Certificate.findById(id);
  if (!certificate) {
    res.status(404);
    throw new Error('Certificate not found');
  }

  res.status(200).json(certificate);
};

const createCertificate = async (req, res) => {
  const { title, issuer, date, order } = req.body;
  if (!title || !issuer || !date || order === undefined) {
    res.status(400);
    throw new Error('Missing required fields');
  }

  const images = req.files;
  if (!images || images.length === 0) {
    res.status(400);
    throw new Error('Must add at least one image');
  }

  const result = await Promise.all(
    images.map((image) => uploadToCloudinary(image.buffer)),
  );

  const certificate = new Certificate({
    title,
    issuer,
    date,
    images: result.map((image) => ({
      url: image.secure_url,
      public_id: image.public_id,
    })),
    order,
  });

  await certificate.save();
  res.status(201).json(certificate);
};

const updateCertificate = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400);
    throw new Error('Missing id');
  }

  const certificate = await Certificate.findById(id);
  if (!certificate) {
    res.status(404);
    throw new Error('Certificate not found');
  }

  const { title, issuer, date, order } = req.body;

  if (title !== undefined) certificate.title = title;
  if (issuer !== undefined) certificate.issuer = issuer;
  if (date !== undefined) certificate.date = date;
  if (order !== undefined) certificate.order = order;

  const images = req.files;
  let oldPublicIds;
  if (images !== undefined && images.length > 0) {
    const result = await Promise.all(
      images.map((image) => uploadToCloudinary(image.buffer)),
    );
    oldPublicIds = certificate.images.map((image) => image.public_id);
    certificate.images = result.map((image) => ({
      url: image.secure_url,
      public_id: image.public_id,
    }));
  }

  if (oldPublicIds) {
    try {
      await Promise.all(
        oldPublicIds.map((publicId) => deleteFromCloudinary(publicId)),
      );
    } catch (error) {
      console.log('Failed to delete old images from cloudinary:', error);
    }
  }

  await certificate.save();
  res.status(200).json(certificate);
};

const deleteCertificate = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(400);
    throw new Error('Missing id');
  }

  const certificate = await Certificate.findById(id);
  if (!certificate) {
    res.status(404);
    throw new Error('Certificate not found');
  }

  try {
    await Promise.all(
      certificate.images.map((image) => deleteFromCloudinary(image.public_id)),
    );
  } catch (error) {
    console.log('Failed to delete images from cloudinary:', error);
  }

  await certificate.deleteOne();

  res.status(200).json({ message: 'Certificate deleted successfully' });
};

export {
  getCertificates,
  getCertificate,
  createCertificate,
  updateCertificate,
  deleteCertificate,
};
