import express from 'express';

const technologyRouter = express.Router();

technologyRouter.get('/technology', (req, res) => {
    res.json({ name: 'technology' });
});

export default technologyRouter;