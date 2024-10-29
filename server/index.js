import express from "express";
import dotenv from "dotenv";
import cors from "cors"; 
import AuthRoutes from "./routes/AuthRoutes.js"; // Importación correcta

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3005; // Usa el puerto definido en .env o 3005 por defecto

app.use(cors());
app.use(express.json());

// Ruta para autenticación
app.use("/api/auth", AuthRoutes);

const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

