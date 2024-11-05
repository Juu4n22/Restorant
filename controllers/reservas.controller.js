const db = require("../db/db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Función para verificar el rol de administrador
const checkAdminRole = (req, res, next) => {
    console.log('User in checkAdminRole:', req.user); 
    if (req.user && req.user.rol === 'admin') {
        next();
    } else {
        res.status(403).json({ error: 'Acceso denegado. Se requiere rol de administrador.' });
    }
};

// Funciones relacionadas con usuarios
const allUsuarios = (req, res) => {
    const sql = "SELECT id_usuario, nombre, email, rol, imagen, created_at, updated_at FROM usuarios";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        res.json(rows);
    }); 
};

const showUsuario = (req, res) => {
    const {id_usuario} = req.params;
    const sql = "SELECT id_usuario, nombre, email, rol, imagen, created_at, updated_at FROM usuarios WHERE id_usuario = ?";
    db.query(sql, [id_usuario], (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe el usuario buscado"});
        };
        res.json(rows[0]);
    }); 
};

const register = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const imagen = req.file ? req.file.filename : null;

        const sql = "INSERT INTO usuarios (nombre, email, password, rol, imagen) VALUES (?, ?, ?, ?, ?)";
        db.query(sql, [nombre, email, hashedPassword, rol, imagen], (error, result) => {
            if (error) {
                return res.status(500).json({ error: "Error al registrar usuario" });
            }
            res.status(201).json({ mensaje: "Usuario registrado exitosamente", id_usuario: result.insertId });
        });
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
};

const updateUsuario = async (req, res) => {
    const {id_usuario} = req.params;
    const { nombre, email, password, rol } = req.body;
    const imagen = req.file ? req.file.filename : null;

    let sql = "UPDATE usuarios SET nombre = ?, email = ?, rol = ?";
    let params = [nombre, email, rol];

    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        sql += ", password = ?";
        params.push(hashedPassword);
    }

    if (imagen) {
        sql += ", imagen = ?";
        params.push(imagen);
    }

    sql += " WHERE id_usuario = ?";
    params.push(id_usuario);

    db.query(sql, params, (error, result) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El usuario a modificar no existe"});
        };
        res.json({mensaje : "Usuario actualizado exitosamente"});
    });     
};

const destroyUsuario = (req, res) => {
    const {id_usuario} = req.params;
    const sql = "DELETE FROM usuarios WHERE id_usuario = ?";
    db.query(sql, [id_usuario], (error, result) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente más tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El usuario a borrar no existe"});
        };
        res.json({mensaje : "Usuario Eliminado"});
    }); 
};

const login = (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM usuarios WHERE email = ?";
    db.query(sql, [email], async (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Error en el servidor" });
        }
        if (results.length === 0) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }
        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }
        const token = jwt.sign(
            { id_usuario: user.id_usuario, email: user.email, rol: user.rol },
            'enigma',
            { expiresIn: '2h' }
        );
        res.json({ token, user: { id_usuario: user.id_usuario, nombre: user.nombre, email: user.email, rol: user.rol } });
    });
};

// Funciones relacionadas con reservas
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

// Funciones relacionadas con mesas
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

// Funciones relacionadas con turnos
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
    checkAdminRole,
    // Funciones relacionadas con usuarios
    allUsuarios,
    showUsuario,
    register,
    updateUsuario,
    destroyUsuario,
    login,
    // Funciones relacionadas con reservas
    allReservas,
    showReserva,
    storeReserva,
    updateReserva,
    destroyReserva,
    // Funciones relacionadas con mesas
    allMesas,
    showMesa,
    storeMesa,
    updateMesa,
    
    destroyMesa,
    // Funciones relacionadas con turnos
    allTurnos,
    showTurno,
    storeTurno,
    updateTurno,
    destroyTurno
};