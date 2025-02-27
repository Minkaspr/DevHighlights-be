import express from "express";
if (process.env.NODE_ENV !== "production") {
  process.loadEnvFile();
}

const app = express();
const PORT = process.env.PORT || 3000;
const AUTHOR = process.env.AUTHOR || "Desconocido";

app.get("/", (req, res) => {
    res.json({ message: "API funcionando" });
});

app.get("/api/v1/credentials", (req, res) => {
    res.json({ author: AUTHOR });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
