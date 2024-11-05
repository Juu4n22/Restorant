// index.js

const express = require("express");
const app = express();
const jwt = require('jsonwebtoken');

// Middleware para parsear JSON en el cuerpo de las solicitudes
app.use(express.json());

// Middleware para servir archivos estáticos
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));

// Importación de router
const reservasRouter = require('./routers/reservas.router');

////////////////////////////////////
const authRouter = require('./routers/auth.router');
//////////////////////////////////

// Middleware de autenticación JWT
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, 'enigma', (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// NUEVO: USAR EL ROUTER DE AUTENTICACIÓN
app.use('/auth', authRouter);
app.use('/reservas', reservasRouter);

//////////////////////////////////////////////////
app.get("/", (req, res) => {
    res.send("Hola Restaurante");
});
///////////////////////////////////////////

// Rutas para usuarios (sin autenticación para registro y login)
app.use('/usuarios/register', reservasRouter);
app.use('/usuarios/login', reservasRouter);

// Rutas para el resto de operaciones (con autenticación JWT)
app.use('/', authenticateJWT, reservasRouter);

// Ruta principal
app.get("/", (req, res) => {
    res.send("Bienvenido al sistema de reservas del restaurante");
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).send("Lo siento, no se pudo encontrar la página solicitada.");
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal en el servidor!');
});

// Configuración del puerto y inicio del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));