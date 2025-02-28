import express from 'express';

const projectTextRouter = express.Router();

projectTextRouter.get('/project-text', (req, res) => {
    res.json({ name: 'project-text' });
});

export default projectTextRouter;