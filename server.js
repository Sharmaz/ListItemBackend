// Modo Estricto
'use strict';

// Dependencias
const http = require('http');
const express = require('express');
const chalk = require('chalk');

/* port tendrá una variable de entorno para producción
 * o 3000 si no existe la variable de entorno o estamos en desarrollo
 **/
const port = process.env.PORT || 3000;
const app = express();

// Creamos el servidor con express
const server = http.createServer(app);

// Corremos el servidor en el puerto asignado con un console.log
server.listen(port, () => {
  console.log(`${chalk.green('[listitem-backend]')} server listening on port ${port}`);
});
