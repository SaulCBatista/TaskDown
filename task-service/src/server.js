const express = require('express');
const app = express();
const milestoneRoutes = require('./routes/milestoneRoutes');
require('dotenv').config();

app.use(express.json());
app.use('/milestones', milestoneRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Task Service rodando na porta ${PORT}`);
});
