'use strict';
var Mensaje = require('../models/mensaje');
var fs = require('fs');
var path = require('path');

var controller = {
  saveMensaje: function(req, res) {
    var mensaje = new Mensaje();
    var params = req.body;

    mensaje.nombre = params.nombre;
    mensaje.apellido = params.apellido;
    mensaje.mensaje = params.mensaje;
    mensaje.imagen = null;

    mensaje.save()
      .then(mensajeStored => {
        if(!mensajeStored) return res.status(404).send({message: 'No se ha guardado el mensaje'});
        return res.status(200).send({mensaje: mensajeStored});
      })
      .catch(err => {
        return res.status(500).send({message: 'Error al guardar el mensaje', error: err});
      });
  },

  uploadImagen: function(req, res) {
    var mensajeId = req.params.id;
    if(req.files){
      var filePath = req.files.imagen.path;
      var fileSplit = filePath.split('\\');
      var fileName = fileSplit[fileSplit.length - 1];

      var extSplit = fileName.split('\.');
      var fileExt = extSplit[extSplit.length - 1].toLowerCase();

      if(['png','jpg','jpeg','gif'].includes(fileExt)){
        Mensaje.findByIdAndUpdate(mensajeId, {imagen: fileName}, {new: true})
          .then(mensajeUpdated => {
            if(!mensajeUpdated){
              fs.unlink(filePath, () => {
                return res.status(404).send({message: 'El mensaje no existe, imagen no subida'});
              });
            } else {
              return res.status(200).send({mensaje: mensajeUpdated});
            }
          })
          .catch(err => {
            fs.unlink(filePath, () => {
              if(err.name === 'CastError'){
                return res.status(404).send({message: 'ID inválido para subir imagen'});
              }
              return res.status(500).send({message: 'Error al subir imagen', error: err});
            });
          });
      } else {
        fs.unlink(filePath, () => {
          return res.status(400).send({message: 'Extensión no válida, archivo eliminado'});
        });
      }
    } else {
      return res.status(400).send({message: 'No se ha subido ninguna imagen'});
    }
  },

  getImagen: function(req, res){
    var file = req.params.imagen;
    var pathFile = './uploads/' + file;

    fs.exists(pathFile, (exists) => {
      if(exists){
        return res.sendFile(path.resolve(pathFile));
      } else {
        return res.status(404).send({message: 'No existe la imagen'});
      }
    });
  }
};

module.exports = controller;
