// Modo Estricto
'use strict';

// Dependencias
const express = require('express');
const ListsController = require('../controllers/lists');
const router = express.Router();

// Lists Endpoints
// Obtenemos todas las listas
router.get('/lists', ListsController.getLists);

// Creamos una lista
router.post('/lists', ListsController.createLists);

// Obtenemos una lista por ID
router.get('/lists/:listId', ListsController.getListsById);

// Modificamos una lista por ID
router.patch('/lists/:listId', ListsController.updateLists);

// Eliminamos una lista por ID
router.delete('/lists/:listId', ListsController.deleteLists);

module.exports = router;
