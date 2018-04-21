// Modo Estricto
'use strict';

// Dependencias
const express = require('express');

const router = express.Router();

// Lists Endpoints
// Obtenemos todas las listas
router.get('/lists', (req, res) => {
  res.status(200).json({
    message: "Getting Lists"
  });
});

// Creamos una lista
router.post('/lists', (req, res) => {
  res.status(200).json({
    message: "List Created"
  });
});

// Obtenemos una lista por ID
router.get('/lists/:listId', (req, res) => {
  const listId = req.params.listId;
  res.status(200).json({
    listId
  });
});

// Modificamos una lista por ID
router.patch('/lists/:listId', (req, res) => {
  const listId = req.params.listId;
  res.status(200).json({
    message: "List Updated!!",
    listId
  });
});

// Eliminamos una lista por ID
router.delete('/lists/:listId', (req, res) => {
  const listId = req.params.listId;
  res.status(200).json({
    message: "List Deleted!!",
    listId
  });
});

module.exports = router;
