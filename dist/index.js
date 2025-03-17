"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const prisma_1 = require("./db-config/prisma");
if (process.env.NODE_ENV !== "production") {
    process.loadEnvFile();
    (0, prisma_1.testConnection)();
}
const routes_1 = __importDefault(require("./routes/routes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const AUTHOR = process.env.AUTHOR || "Desconocido";
const allowedOrigins = [
    "http://localhost:4200",
    "https://portfolio-plum-iota-60.vercel.app",
    "https://dev-highlights.vercel.app"
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.json({ message: "API funcionando" });
});
app.get("/api/v1/credentials", (req, res) => {
    res.json({ author: AUTHOR });
});
app.use("/api/v1", routes_1.default);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
exports.default = app;
