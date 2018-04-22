// Modo Estricto
'use strict'

// Dependencias
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Creamos el esquema de base de datos para las listas
const listSchema = new Schema({
  name: {type: String, required: true},
  items: [{
    type: Schema.Types.ObjectId,
    ref: 'Item',
  }]
});

module.exports = mongoose.model('List', listSchema);
