const prisma = require('../prisma/prismaClient');

const getAllIssues = async () => {
  return await prisma.issue.findMany({
    include: {
      milestone: true, 
    },
  });
};

const getIssueById = async (id) => {
  return await prisma.issue.findUnique({
    where: { id: Number(id) },
    include: {
      milestone: true, 
    },
  });
};

const createIssue = async (data) => {
  const { title, description, progress, milestoneId } = data;
  return await prisma.issue.create({
    data: {
      title,
      description,
      progress: Number(progress),
      milestone: {
        connect: { id: Number(milestoneId) },
      },
    },
  });
};

const updateIssue = async (id, data) => {
  const { title, description, progress, milestoneId } = data;
  const updateData = {};
  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (progress !== undefined) updateData.progress = Number(progress);
  if (milestoneId !== undefined) {
    updateData.milestone = {
      connect: { id: Number(milestoneId) },
    };
  }

  return await prisma.issue.update({
    where: { id: Number(id) },
    data: updateData,
  });
};

const deleteIssue = async (id) => {
  return await prisma.issue.delete({ where: { id: Number(id) } });
};

module.exports = {
  getAllIssues,
  getIssueById,
  createIssue,
  updateIssue,
  deleteIssue,
};