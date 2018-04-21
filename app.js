// Modo Estricto
'use strict';

// Dependencias
const express = require('express');
const ListsRoutes = require('./api/routes/lists');
const ItemsRoutes = require('./api/routes/items');

const app = express();

// Manejamos los Endpoints de nuestro API con Express
app.use('/api', ListsRoutes);
app.use('/api', ItemsRoutes);

module.exports = app;
