import express from 'express';

const languageRouter = express.Router();

languageRouter.get('/language', (req, res) => {
    res.json({ language: 'es' });
});

export default languageRouter;