const express = require('express');
const router = express.Router();
const milestoneController = require('../controllers/milestoneController');
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, milestoneController.getAllMilestones);
router.get('/:id', milestoneController.getMilestoneById);
router.post('/', authMiddleware, milestoneController.createMilestone);
router.put('/:id', milestoneController.updateMilestone);
router.delete('/:id', milestoneController.deleteMilestone);

module.exports = router;
