import express from "express";
import cors from "cors";
import { testConnection } from "./db-config/prisma";
if (process.env.NODE_ENV !== "production") {
  process.loadEnvFile();
  testConnection();
}
import router from "./routes/routes";

const app = express();
const PORT = process.env.PORT || 3000;
const AUTHOR = process.env.AUTHOR || "Desconocido";

const allowedOrigins = [
  "http://localhost:4200", 
  "https://portfolio-plum-iota-60.vercel.app",
  "https://dev-highlights.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, 
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "API funcionando" });
});

app.get("/api/v1/credentials", (req, res) => {
    res.json({ author: AUTHOR });
});

app.use("/api/v1", router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
