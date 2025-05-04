import express from 'express';
import cors from 'cors';
import db from './config/db.js';
import usuariosRoutes from './routes/usuariosRoutes.js';
import serviciosRoutes from './routes/serviciosRoutes.js'
import citasRoutes from './routes/citasRoutes.js';
const app = express();
const port = process.env.PORT || 4000;

db.authenticate()
    .then(() => console.log('Database connected'))
    .catch((error) => console.log(error));

const dominiosPermitidos = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: function (origin, callback) {
        if (dominiosPermitidos.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/servicios", serviciosRoutes);
app.use("/api/citas", citasRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
