// Modo Estricto
'use strict';

// Dependencias
const express = require('express');
const debug = require('debug')('listitem:backend')
const ListsRoutes = require('./api/routes/lists');
const ItemsRoutes = require('./api/routes/items');

const app = express();

// Manejamos los Endpoints de nuestro API con Express
app.use('/api', ListsRoutes);
app.use('/api', ItemsRoutes);

// Manejamos los Errores
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  // Lanzamos un log en consola con la referencia a donde se encuentra el error
  debug(`Error: ${error.message}`);
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});


module.exports = app;
