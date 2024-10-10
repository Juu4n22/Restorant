/// RUTAS DEL MODULO ///
const express = require("express");
const router = express.Router();

const controller = require("../controllers/reservas.controller");
//// METODO GET  /////

// Para todos los productos
router.get('/', controller.allReservas);

// Para un producto
router.get('/:id_reserva', controller.showReserva);

//// METODO POST  ////
router.post('/', controller.storeReserva);

//// METODO PUT  ////
router.put('/:id_reserva', controller.updateReserva);

//// METODO DELETE ////
router.delete('/:id_reserva', controller.destroyReserva);

// EXPORTAR ROUTERS
module.exports = router;