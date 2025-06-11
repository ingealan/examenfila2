'use strict';

var express = require('express');
var multipart = require('connect-multiparty');
var router = express.Router();

var mensajeController = require('../controllers/mensajeController');

// Middleware para subida de archivos, con carpeta destino 'uploads'
var multipartMiddleware = multipart({ uploadDir: './uploads' });

// Ruta para guardar mensaje (sin archivo)
router.post('/guardar-mensaje', mensajeController.saveMensaje);

// Ruta para subir imagen de mensaje con id y multipart middleware para procesar archivo
router.post('/subir-imagen-mensaje/:id', multipartMiddleware, mensajeController.uploadImagen);

module.exports = router;
