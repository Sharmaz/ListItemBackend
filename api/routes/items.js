// Modo Estricto
'use strict';

// Dependencias
const express = require('express');
const ItemsController = require('../controllers/items');

const router = express.Router();

// Items Endpoints
// Obtenemos todos los items
router.get('/items', ItemsController.getItems);

// Creamos un Item
router.post('/items', ItemsController.createItems);

// Obtenemos un Item por ID
router.get('/items/:itemId', ItemsController.getItemsById);

// Modificamos un Item por ID
router.patch('/items/:itemId', ItemsController.updateItems);

// Eliminamos un Item por ID
router.delete('/items/:itemId', ItemsController.deleteItems);

module.exports = router;
