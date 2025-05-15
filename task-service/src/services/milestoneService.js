const prisma = require('../prisma/prismaClient');

const getAllMilestones = async () => {
  return await prisma.milestone.findMany();
};

const getMilestoneById = async (id) => {
  return await prisma.milestone.findUnique({ where: { id: Number(id) } });
};

const createMilestone = async (data) => {
  return await prisma.milestone.create({ data });
};

const updateMilestone = async (id, data) => {
  return await prisma.milestone.update({
    where: { id: Number(id) },
    data,
  });
};

const deleteMilestone = async (id) => {
  return await prisma.milestone.delete({ where: { id: Number(id) } });
};

module.exports = {
  getAllMilestones,
  getMilestoneById,
  createMilestone,
  updateMilestone,
  deleteMilestone,
};
