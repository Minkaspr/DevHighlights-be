"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const technologyRouter = express_1.default.Router();
technologyRouter.get('/technology', (req, res) => {
    res.json({ name: 'technology' });
});
exports.default = technologyRouter;
