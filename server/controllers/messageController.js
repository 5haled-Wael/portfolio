import Message from '../models/Message.js';

const getAllMessages = async (req, res) => {
  const messages = await Message.find();
  res.status(200).json(messages);
};

const getMessage = async (req, res) => {
  const id = req.params.id;
  const message = await Message.findById(id);
  if (!message) {
    res.status(404);
    throw new Error('Message not found');
  }
  res.status(200).json(message);
};

const createMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    res.status(400);
    throw new Error('Please provide all the required fields');
  }
  await Message.create({
    name,
    email,
    subject,
    message,
  });
  res.status(201).json({ message: 'Message created successfully' });
};

const updateMessage = async (req, res) => {
  const id = req.params.id;
  const message = await Message.findById(id);
  if (!message) {
    res.status(404);
    throw new Error('Message not found');
  }
  const { isRead } = req.body;
  if (typeof isRead !== 'boolean') {
    res.status(400);
    throw new Error('isRead must be a boolean');
  }

  message.isRead = isRead;
  await message.save();
  res.status(200).json(message);
};

const deleteMessage = async (req, res) => {
  const id = req.params.id;
  const message = await Message.findById(id);
  if (!message) {
    res.status(404);
    throw new Error('Message not found');
  }
  await message.deleteOne();
  res.status(200).json({ message: 'Message deleted successfully' });
};

export {
  getAllMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
};
