"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
process.loadEnvFile();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const AUTHOR = process.env.AUTHOR || "Desconocido";
app.get("/", (req, res) => {
    res.json({ message: "API funcionando" });
});
app.get("/api/v1/credentials", (req, res) => {
    res.json({ author: AUTHOR });
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
exports.default = app;
