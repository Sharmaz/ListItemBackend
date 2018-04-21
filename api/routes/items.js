// Modo Estricto
'use strict';

// Dependencias
const express = require('express');

const router = express.Router();

// Items Endpoints
// Obtenemos todos los items
router.get('/items', (req, res) => {
  res.status(200).json({
    message: "Getting Items"
  });
});

// Creamos un Item
router.post('/items', (req, res) => {
  res.status(200).json({
    message: "Item Created!!"
  });
});

// Obtenemos un Item por ID
router.get('/items/:itemId', (req, res) => {
  const itemId = req.params;
  res.status(200).json({
    itemId
  });
});

// Modificamos un Item por ID
router.patch('/items/:itemId', (req, res) => {
  const itemId = req.params;
  res.status(200).json({
    message: "Item Updated!!",
    itemId
  });
});

// Eliminamos un Item por ID
router.delete('/items/:itemId', (req, res) => {
  const itemId = req.params.itemId;
  res.status(200).json({
    message: "Item Deleted!!",
    itemId
  });
});

module.exports = router;
