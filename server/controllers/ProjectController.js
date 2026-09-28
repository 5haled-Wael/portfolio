import Project from '../models/Project.js';
import deleteFromCloudinary from '../utils/deleteFromCloudinary.js';
import uploadToCloudinary from '../utils/uploadToCloudinary.js';

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    if (projects.length === 0)
      return res.status(404).json({ message: 'No available projects' });

    res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Internal server error` });
  }
};

const getProjectById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: 'Must add id' });

    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    res.status(200).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Internal server error` });
  }
};

const createProject = async (req, res) => {
  try {
    const { title, description, tags, githubUrl, liveUrl, featured, order } =
      req.body;

    let parsedTags;
    try {
      parsedTags = JSON.parse(tags);
    } catch (error) {
      return res.status(400).json({ message: 'Tags must be a valid array' });
    }

    if (
      !title ||
      !description ||
      !Array.isArray(parsedTags) ||
      parsedTags.length === 0
    )
      return res
        .status(400)
        .json({ message: 'Must add title, description, and tags' });

    const orderValue = order ? Number(order) : undefined;
    if (orderValue !== undefined && Number.isNaN(orderValue))
      return res.status(400).json({ message: 'Order must be a number' });

    const image = req.file;
    if (!image) return res.status(400).json({ message: 'Must add image' });
    const result = await uploadToCloudinary(image.buffer);

    const project = new Project({
      title,
      description,
      tags: parsedTags,
      image: { url: result.secure_url, public_id: result.public_id },
      githubUrl,
      liveUrl,
      featured: featured === 'true',
      order: orderValue,
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Internal server error` });
  }
};

const updateProject = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: 'Must add id' });

    let { title, description, tags, githubUrl, liveUrl, featured, order } =
      req.body;

    let project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (tags !== undefined) {
      try {
        tags = JSON.parse(tags);
        if (!Array.isArray(tags) || tags.length === 0)
          return res
            .status(400)
            .json({ message: 'Tags must be a valid array' });
        project.tags = tags;
      } catch (error) {
        return res.status(400).json({ message: 'Tags must be a valid array' });
      }
    }

    if (order !== undefined) {
      order = Number(order);
      if (Number.isNaN(order))
        return res.status(400).json({ message: 'Order must be a number' });
      project.order = order;
    }

    if (featured !== undefined) {
      featured = featured === 'true';
      project.featured = featured;
    }

    const image = req.file;
    let oldPublicId;

    if (image !== undefined) {
      const result = await uploadToCloudinary(image.buffer);
      oldPublicId = project.image.public_id;
      project.image = { url: result.secure_url, public_id: result.public_id };
    }

    if (title !== undefined) project.title = title;
    if (description !== undefined) project.description = description;
    if (githubUrl !== undefined) project.githubUrl = githubUrl;
    if (liveUrl !== undefined) project.liveUrl = liveUrl;

    await project.save();

    if (oldPublicId) {
      try {
        await deleteFromCloudinary(oldPublicId);
      } catch (error) {
        console.log('Failed to delete old image from cloudinary:', error);
      }
    }

    res.status(200).json(project);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Internal server error` });
  }
};

const deleteProject = async (req, res) => {
  try {
    const id = req.params.id;
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    await project.deleteOne();

    try {
      await deleteFromCloudinary(project.image.public_id);
    } catch (error) {
      console.log('Failed to delete image from cloudinary:', error);
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Internal server error` });
  }
};

export {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
