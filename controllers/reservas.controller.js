const db = require("../db/db");

// Métodos para reservas
const allReservas = (req, res) => {
    const sql = "SELECT * FROM reservas";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        res.json(rows);
    }); 
};

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
    }); 
};

const storeReserva = (req, res) => {
    const {nombre_cliente, fecha_hora, num_personas, id_mesa, id_turno} = req.body;
    const sql = "INSERT INTO reservas (nombre_cliente, fecha_hora, num_personas, id_mesa, id_turno) VALUES (?,?,?,?,?)";
    db.query(sql,[nombre_cliente, fecha_hora, num_personas, id_mesa, id_turno], (error, result) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        const reserva = {...req.body, id_reserva: result.insertId};
        res.status(201).json(reserva);
    });     
};

const updateReserva = (req, res) => {
    const {id_reserva} = req.params;
    const {nombre_cliente, fecha_hora, num_personas, id_mesa, id_turno} = req.body;
    const sql ="UPDATE reservas SET nombre_cliente = ?, fecha_hora = ?, num_personas = ?, id_mesa = ?, id_turno = ? WHERE id_reserva = ?";
    db.query(sql,[nombre_cliente, fecha_hora, num_personas, id_mesa, id_turno, id_reserva], (error, result) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: La reserva a modificar no existe"});
        };
        const reserva = {...req.body, ...req.params};
        res.json(reserva);
    });     
};

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

// Métodos para mesas
const allMesas = (req, res) => {
    const sql = "SELECT * FROM mesas";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        res.json(rows);
    }); 
};

const showMesa = (req, res) => {
    const {id_mesa} = req.params;
    const sql = "SELECT * FROM mesas WHERE id_mesa = ?";
    db.query(sql,[id_mesa], (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe la mesa buscada"});
        };
        res.json(rows[0]);
    }); 
};

const storeMesa = (req, res) => {
    const {numero_mesa, capacidad, estado} = req.body;
    const sql = "INSERT INTO mesas (numero_mesa, capacidad, estado) VALUES (?,?,?)";
    db.query(sql,[numero_mesa, capacidad, estado], (error, result) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        const mesa = {...req.body, id_mesa: result.insertId};
        res.status(201).json(mesa);
    });     
};

const updateMesa = (req, res) => {
    const {id_mesa} = req.params;
    const {numero_mesa, capacidad, estado} = req.body;
    const sql ="UPDATE mesas SET numero_mesa = ?, capacidad = ?, estado = ? WHERE id_mesa = ?";
    db.query(sql,[numero_mesa, capacidad, estado, id_mesa], (error, result) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: La mesa a modificar no existe"});
        };
        const mesa = {...req.body, ...req.params};
        res.json(mesa);
    });     
};

const destroyMesa = (req, res) => {
    const {id_mesa} = req.params;
    const sql = "DELETE FROM mesas WHERE id_mesa = ?";
    db.query(sql,[id_mesa], (error, result) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: La mesa a borrar no existe"});
        };
        res.json({mensaje : "Mesa Eliminada"});
    }); 
};

// Métodos para turnos
const allTurnos = (req, res) => {
    const sql = "SELECT * FROM turnos";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        res.json(rows);
    }); 
};

const showTurno = (req, res) => {
    const {id_turno} = req.params;
    const sql = "SELECT * FROM turnos WHERE id_turno = ?";
    db.query(sql,[id_turno], (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe el turno buscado"});
        };
        res.json(rows[0]);
    }); 
};

const storeTurno = (req, res) => {
    const {hora_inicio, hora_fin, descripcion} = req.body;
    const sql = "INSERT INTO turnos (hora_inicio, hora_fin, descripcion) VALUES (?,?,?)";
    db.query(sql,[hora_inicio, hora_fin, descripcion], (error, result) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        const turno = {...req.body, id_turno: result.insertId};
        res.status(201).json(turno);
    });     
};

const updateTurno = (req, res) => {
    const {id_turno} = req.params;
    const {hora_inicio, hora_fin, descripcion} = req.body;
    const sql ="UPDATE turnos SET hora_inicio = ?, hora_fin = ?, descripcion = ? WHERE id_turno = ?";
    db.query(sql,[hora_inicio, hora_fin, descripcion, id_turno], (error, result) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El turno a modificar no existe"});
        };
        const turno = {...req.body, ...req.params};
        res.json(turno);
    });     
};

const destroyTurno = (req, res) => {
    const {id_turno} = req.params;
    const sql = "DELETE FROM turnos WHERE id_turno = ?";
    db.query(sql,[id_turno], (error, result) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El turno a borrar no existe"});
        };
        res.json({mensaje : "Turno Eliminado"});
    }); 
};

module.exports = {
    allReservas,
    showReserva,
    storeReserva,
    updateReserva,
    destroyReserva,
    allMesas,
    showMesa,
    storeMesa,
    updateMesa,
    destroyMesa,
    allTurnos,
    showTurno,
    storeTurno,
    updateTurno,
    destroyTurno
};