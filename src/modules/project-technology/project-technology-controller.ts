import express from 'express';

const projectTechnologyRouter = express.Router();

projectTechnologyRouter.get('/project-technology', (req, res) => {
    res.json({ name: 'project-technology' });
});

export default projectTechnologyRouter;