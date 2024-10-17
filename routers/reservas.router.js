const express = require("express");
const router = express.Router();

const controller = require("../controllers/reservas.controller");

// Rutas para reservas
router.get('/reservas', controller.allReservas);
router.get('/reservas/:id_reserva', controller.showReserva);
router.post('/reservas', controller.storeReserva);
router.put('/reservas/:id_reserva', controller.updateReserva);
router.delete('/reservas/:id_reserva', controller.destroyReserva);

// Rutas para mesas
router.get('/mesas', controller.allMesas);
router.get('/mesas/:id_mesa', controller.showMesa);
router.post('/mesas', controller.storeMesa);
router.put('/mesas/:id_mesa', controller.updateMesa);
router.delete('/mesas/:id_mesa', controller.destroyMesa);

// Rutas para turnos
router.get('/turnos', controller.allTurnos);
router.get('/turnos/:id_turno', controller.showTurno);
router.post('/turnos', controller.storeTurno);
router.put('/turnos/:id_turno', controller.updateTurno);
router.delete('/turnos/:id_turno', controller.destroyTurno);

module.exports = router;