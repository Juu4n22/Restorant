const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/db');

//CLAVE SECRETA PARA JWT
const SECRET_KEY = 'enigma';

//FUNCIÓN PARA REGISTRAR USUARIOS
exports.register = (req, res) => {
    const { nombre, email, password, rol } = req.body;
    const imagen = req.file ? req.file.filename : null;
    
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error al hashear la contraseña:', err);
            return res.status(500).json({ error: 'Error al hashear la contraseña' });
        }
        
        const sql = 'INSERT INTO usuarios (nombre, email, password, rol, imagen) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [nombre, email, hashedPassword, rol || 'usuario', imagen], (error, result) => {
            if (error) {
                console.error('Error al registrar el usuario:', error);
                return res.status(500).json({ error: 'Error al registrar el usuario', details: error.message });
            }
            res.status(201).json({ message: 'Usuario registrado exitosamente', id_usuario: result.insertId });
        });
    });
};

//FUNCIÓN PARA INICIAR SESIÓN
exports.login = (req, res) => {
    const { email, password } = req.body;
    
    const sql = 'SELECT * FROM usuarios WHERE email = ?';
    db.query(sql, [email], (error, results) => {
        if (error) {
            console.error('Error en el servidor:', error);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        if (results.length === 0) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        
        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err || !isMatch) {
                return res.status(401).json({ error: 'Credenciales inválidas' });
            }
            
            const token = jwt.sign(
                { id_usuario: user.id_usuario, email: user.email, rol: user.rol },
                SECRET_KEY,
                { expiresIn: '2h' }
            );
            
            res.json({ 
                token, 
                user: { 
                    id_usuario: user.id_usuario, 
                    nombre: user.nombre, 
                    email: user.email, 
                    rol: user.rol 
                } 
            });
        });
    });
};