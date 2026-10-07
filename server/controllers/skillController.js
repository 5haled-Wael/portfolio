import Skill from '../models/Skill.js';

const getSkills = async (req, res) => {
  const skills = await Skill.find().sort({ order: 1 });
  res.status(200).json(skills);
};

const getSkillById = async (req, res) => {
  const id = req.params.id;
  const skill = await Skill.findById(id);
  if (!skill) {
    res.status(404);
    throw new Error('Skill not found');
  }
  res.status(200).json(skill);
};

const createSkill = async (req, res) => {
  const { name, type, icon, order } = req.body;
  if (!name || !type || !icon) {
    res.status(400);
    throw new Error('Must add name, type, and icon');
  }

  const skill = new Skill({
    name,
    type,
    icon,
    order,
  });

  await skill.save();
  res.status(201).json(skill);
};

const updateSkill = async (req, res) => {
  const id = req.params.id;

  const { name, type, icon, order } = req.body;

  if (
    name === undefined &&
    type === undefined &&
    icon === undefined &&
    order === undefined
  ) {
    res.status(400);
    throw new Error('Must provide at least one field to update');
  }

  const skill = await Skill.findById(id);
  if (!skill) {
    res.status(404);
    throw new Error('Skill not found');
  }

  if (name !== undefined) skill.name = name;
  if (type !== undefined) skill.type = type;
  if (icon !== undefined) skill.icon = icon;
  if (order !== undefined) skill.order = Number(order);

  await skill.save();
  res.status(200).json(skill);
};

const deleteSkill = async (req, res) => {
  const id = req.params.id;

  const skill = await Skill.findById(id);
  if (!skill) {
    res.status(404);
    throw new Error('Skill not found');
  }
  await skill.deleteOne();
  res.status(200).json({ message: 'Skill deleted successfully' });
};

export { getSkills, getSkillById, createSkill, updateSkill, deleteSkill };
