const express = require('express');
const app = express();
const milestoneRoutes = require('./routes/milestoneRoutes');
const issueRoutes = require('./routes/issueRoutes');
require('dotenv').config();

app.use(express.json());
app.use('/milestones', milestoneRoutes);
app.use('/issues', issueRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Task Service rodando na porta ${PORT}`);
});
