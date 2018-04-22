// Modo Estricto
'use strict'

// Dependencias
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Creamos el esquema de base de datos para los items
const itemSchema = new Schema({
  name: {type: String, required: true},
  list: {
    type: Schema.Types.ObjectId,
    ref: 'List',
    required: true
  }
});

module.exports = mongoose.model('Item', itemSchema);
