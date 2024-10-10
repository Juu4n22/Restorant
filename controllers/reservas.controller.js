/// CONTROLADORES DEL MODULO ///

// Campos de la tabla reservas
// id_reserva
// nombre_cliente
// fecha_hora
// num_personas

const db = require("../db/db");
//// METODO GET  /////

// Para todos las peliculas


const allReservas = (req, res) => {
    const sql = "SELECT * FROM reservas";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        res.json(rows);
    }); 
};
// Para una pelicula
const showReserva = (req, res) => {
    const {id_reserva} = req.params;
    const sql = "SELECT * FROM reservas WHERE id_reserva = ?";
    db.query(sql,[id_reserva], (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe la reserva buscada"});
        };
        res.json(rows[0]);
        // me muestra el elemento en la posicion cero si existe.
    }); 
};

//// METODO POST  ////
const storeReserva = (req, res) => {
    const {nombre_cliente, fecha_hora, num_personas} = req.body;
    const sql = "INSERT INTO reservas (nombre_cliente, fecha_hora, num_personas) VALUES (?,?,?)";
    db.query(sql,[nombre_cliente, fecha_hora, num_personas], (error, result) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        const reserva = {...req.body, id: result.insertId}; // ... reconstruir el objeto del body
        res.status(201).json(reserva); // muestra creado con exito el elemento
    });     
};
//// METODO PUT  ////
const updateReserva = (req, res) => {
    const {id_reserva} = req.params;
    const {nombre_cliente, fecha_hora, num_personas} = req.body;
    const sql ="UPDATE reservas SET nombre_cliente = ?, fecha_hora = ?, num_personas = ? WHERE id_reserva = ?";
    db.query(sql,[nombre_cliente, fecha_hora, num_personas, id_reserva], (error, result) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: La reserva a modificar no existe"});
        };
        
        const reserva = {...req.body, ...req.params}; // ... reconstruir el objeto del body
        res.json(reserva); // mostrar el elmento que existe
    });     
};

//// METODO DELETE ////
const destroyReserva = (req, res) => {
    const {id_reserva} = req.params;
    const sql = "DELETE FROM reservas WHERE id_reserva = ?";
    db.query(sql,[id_reserva], (error, result) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: La reserva a borrar no existe"});
        };
        res.json({mensaje : "Reserva Eliminada"});
    }); 
};

// EXPORTAR DEL MODULO TODAS LAS FUNCIONES
module.exports = {
    allReservas,
    showReserva,
    storeReserva,
    updateReserva,
    destroyReserva
};