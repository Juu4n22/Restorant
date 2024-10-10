// CONFIGURAR LO QUE SERIA UN SERVIDOR CON LAS MINIMAS PRESTACIONES PARA CORRER EXPRESS
// Que este escuchando y tengamos una ruta principal "/" en el proyecto
const express = require("express");
const app = express();

app.use(express.json());
//en el cuerpo de la peticion viene un json, lo voy a transformar en un objeto JS y de esta manera
// lo voy a poder utilizar
const reservasRouter = require('./routers/reservas.router');
app.use('/reservas', reservasRouter);
// Siempre que me refiera a peliculas le coloco el prefijo
app.get("/", (req, res) => {
    res.send("Hola Restaurante");
});
// Esta es la ruta principal del proyecto "/"
const PORT = 3000;
app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`));