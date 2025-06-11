'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MensajeSchema = Schema({
  nombre: String,
  apellido: String,
  mensaje: String,
  imagen: String
});

module.exports = mongoose.model('Mensaje', MensajeSchema);
