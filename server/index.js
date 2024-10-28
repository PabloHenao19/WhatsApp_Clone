import express from "express";
import dotenv from "dotenv";
import cors from "cors"; 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3005; // Usa el puerto definido en .env o 3005 por defecto

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/api/hello', (req, res) => {
    res.send("Hello, this is a test route!");
});

const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});