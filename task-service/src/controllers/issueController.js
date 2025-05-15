const issueService = require('../services/issueService');

const createIssue = async (req, res) => {
  try {
    const newIssue = await issueService.createIssue(req.body);
    res.status(201).json(newIssue);
  } catch (error) {
    console.error('Error creating issue:', error);
    if (error.code === 'P2025' || (error.code === 'P2003' && error.meta?.field_name?.includes('milestoneId'))) {
      return res.status(400).json({ error: 'Erro ao criar issue: Milestone associada não encontrada ou inválida.' });
    }
    res.status(400).json({ error: 'Erro ao criar issue.' });
  }
};

const getAllIssues = async (req, res) => {
  try {
    const issues = await issueService.getAllIssues();
    res.json(issues);
  } catch (error) {
    console.error('Error fetching issues:', error);
    res.status(500).json({ error: 'Erro ao buscar issues.' });
  }
};

const getIssueById = async (req, res) => {
  try {
    const issue = await issueService.getIssueById(req.params.id);
    if (issue) {
      res.json(issue);
    } else {
      res.status(404).json({ error: 'Issue não encontrada.' });
    }
  } catch (error) {
    console.error(`Error fetching issue ${req.params.id}:`, error);
    res.status(500).json({ error: 'Erro ao buscar issue.' });
  }
};

const updateIssue = async (req, res) => {
  try {
    const updatedIssue = await issueService.updateIssue(req.params.id, req.body);
    res.json(updatedIssue);
  } catch (error) {
    console.error(`Error updating issue ${req.params.id}:`, error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Erro ao atualizar issue: Issue ou Milestone associada não encontrada.' });
    }
    if (error.code === 'P2003' && error.meta?.field_name?.includes('milestoneId')) {
      return res.status(400).json({ error: 'Erro ao atualizar issue: Milestone associada não encontrada ou inválida.' });
    }
    res.status(400).json({ error: 'Erro ao atualizar issue.' });
  }
};

const deleteIssue = async (req, res) => {
  try {
    await issueService.deleteIssue(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error(`Error deleting issue ${req.params.id}:`, error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Erro ao deletar issue: Issue não encontrada.' });
    }
    res.status(400).json({ error: 'Erro ao deletar issue.' });
  }
};

module.exports = {
  createIssue,
  getAllIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
};