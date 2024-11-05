const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const authMiddleware = require('../middlewares/auth.middleware');
const controller = require("../controllers/reservas.controller");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

// Rutas para usuarios
router.get('/usuarios', authMiddleware, controller.checkAdminRole, controller.allUsuarios);
router.get('/usuarios/:id_usuario', authMiddleware, controller.showUsuario);
router.post('/usuarios', upload.single('imagen'), controller.register);
router.put('/usuarios/:id_usuario', authMiddleware, upload.single('imagen'), controller.updateUsuario);
router.delete('/usuarios/:id_usuario', authMiddleware, controller.checkAdminRole, controller.destroyUsuario);
router.post('/login', controller.login);

// Rutas para reservas
router.get('/reservas', authMiddleware, controller.allReservas);
router.get('/reservas/:id_reserva', authMiddleware, controller.showReserva);
router.post('/reservas', authMiddleware, controller.storeReserva);
router.put('/reservas/:id_reserva', authMiddleware, controller.updateReserva);
router.delete('/reservas/:id_reserva', authMiddleware, controller.destroyReserva);

// Rutas para mesas
router.get('/mesas', authMiddleware, controller.allMesas);
router.get('/mesas/:id_mesa', authMiddleware, controller.showMesa);
router.post('/mesas', authMiddleware, controller.checkAdminRole, controller.storeMesa);
router.put('/mesas/:id_mesa', authMiddleware, controller.checkAdminRole, controller.updateMesa);
router.delete('/mesas/:id_mesa', authMiddleware, controller.checkAdminRole, controller.destroyMesa);

// Rutas para turnos
router.get('/turnos', authMiddleware, controller.allTurnos);
router.get('/turnos/:id_turno', authMiddleware, controller.showTurno);
router.post('/turnos', authMiddleware, controller.checkAdminRole, controller.storeTurno);
router.put('/turnos/:id_turno', authMiddleware, controller.checkAdminRole, controller.updateTurno);
router.delete('/turnos/:id_turno', authMiddleware, controller.checkAdminRole, controller.destroyTurno);

module.exports = router;