// Modo Estricto
'use strict';

// Dependencias
const express = require('express');
const bodyParser = require('body-parser');
const debug = require('debug')('listitem:backend')
const mongoose = require('mongoose');
const ListsRoutes = require('./api/routes/lists');
const ItemsRoutes = require('./api/routes/items');

/* Conectamos la base de datos en MongoDB Atalas con Mongoose
 * Utilizamos la variable de entorno MONGO_ATLAS_PASS en nodemon.json
 */
mongoose.connect(
  'mongodb://ListItem:' 
  + process.env.MONGO_ATLAS_PASS + 
  '@listitem-shard-00-00-edxzq.mongodb.net:27017,listitem-shard-00-01-edxzq.mongodb.net:27017,listitem-shard-00-02-edxzq.mongodb.net:27017/test?ssl=true&replicaSet=ListItem-shard-0&authSource=admin'
);

const app = express();

// Middlewares
app.use(bodyParser.json());

// Permitimos acceso a nuestro API desde servidores externos (Manejo de CORS)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methos', 'PATCH, POST, PUT, GET, DELETE');
    return res.status(200).json({});
  }
  next();
});


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
