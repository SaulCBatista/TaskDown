const milestoneService = require('../services/milestoneService');

const getAllMilestones = async (req, res) => {
  try {
    const milestones = await milestoneService.getAllMilestones();
    res.json(milestones);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar milestones.' });
  }
};

const getMilestoneById = async (req, res) => {
  try {
    const milestone = await milestoneService.getMilestoneById(req.params.id);
    if (milestone) {
      res.json(milestone);
    } else {
      res.status(404).json({ error: 'Milestone não encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar milestone.' });
    console.error(error);
  }
};

const createMilestone = async (req, res) => {
  try {
    const newMilestone = await milestoneService.createMilestone(req.body);
    res.status(201).json(newMilestone);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar milestone.' });
    console.error(error);
  }
};

const updateMilestone = async (req, res) => {
  try {
    const updatedMilestone = await milestoneService.updateMilestone(req.params.id, req.body);
    res.json(updatedMilestone);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar milestone.' });
  }
};

const deleteMilestone = async (req, res) => {
  try {
    await milestoneService.deleteMilestone(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Erro ao deletar milestone.' });
  }
};

module.exports = {
  getAllMilestones,
  getMilestoneById,
  createMilestone,
  updateMilestone,
  deleteMilestone,
};
