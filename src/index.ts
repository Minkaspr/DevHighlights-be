import express from "express";
if (process.env.NODE_ENV !== "production") {
  process.loadEnvFile();
}
import router from "./routes/routes";

const app = express();
const PORT = process.env.PORT || 3000;
const AUTHOR = process.env.AUTHOR || "Desconocido";

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
