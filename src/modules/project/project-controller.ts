import express from 'express';

const projectRouter = express.Router();

projectRouter.get('/project', (req, res) => {
    res.json({ name: 'project' });
});

export default projectRouter;