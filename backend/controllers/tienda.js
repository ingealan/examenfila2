'use strict'
var Producto = require("../models/producto");
var path=require('path');
var fs=require('fs');

var controller={
    home:function(req,res){
        return res.status(200).send( 
            "<h1>hola mundo</h1>"
        );
    },
    saveProducto:function(req,res){
        var producto=new Producto();
        var params=req.body;

        producto.marca=params.marca;
        producto.modelo=params.modelo;
        producto.ram=params.ram;
        producto.rom=params.rom;
        producto.precio=params.precio;
        producto.imagen=null;
        // save() también devuelve una promesa
        producto.save() 
            .then(productoStored => {
                if(!productoStored) return res.status(404).send({message:'No se ha guardado el producto'});
                return res.status(200).send({producto:productoStored});
            })
            .catch(err => {
                return res.status(500).send({message:'Error al guardar', error: err});
            });
    },
    getProductos:function(req,res){
        Producto.find({}).sort().exec()
            .then(productos => {
                if(!productos || productos.length === 0) 
                    return res.status(404).send({message:'No hay productos para mostrar'});
                return res.status(200).send({productos});
            })
            .catch(err => {
                return res.status(500).send({message:'Error al recuperar los datos', error: err});
            });
    },
    getProducto:function(req,res){
        var productoId=req.params.id;
        
        Producto.findById(productoId) // findById también devuelve una promesa
            .then(producto => {
                if(!producto) return res.status(404).send({message:'El producto no existe'});
                return res.status(200).send({producto});
            })
            .catch(err => {
                // Mongoose puede lanzar un CastError si el ID no es válido 
                if (err.name === 'CastError') {
                    return res.status(404).send({message:'Formato de ID de producto no válido.'});
                }
                return res.status(500).send({message:'Error al recuperar los datos', error: err});
            });
    },
    deleteProducto:function(req,res){
        var productoId=req.params.id;
        // Mongoose recomienda findByIdAndDelete en lugar de findByIdAndRemove
        Producto.findByIdAndDelete(productoId) 
            .then(productoRemoved => {
                if(!productoRemoved) 
                    return res.status(404).send(
                {message:'No se puede eliminar el producto porque no existe'});
                return res.status(200).send(
                    {producto:productoRemoved, message: 'Producto eliminado correctamente'});
            })
            .catch(err => {
                 if (err.name === 'CastError') {
                    return res.status(404).send(
                        {message:'Formato de ID de producto no válido para eliminar.'});
                }
                return res.status(500).send({message:'Error al eliminar los datos', error: err});
            });
    },
    updateProducto:function(req,res){
        var productoId=req.params.id;
        var update=req.body;
        Producto.findByIdAndUpdate(productoId,update,{new:true}) 
            .then(productoUpdate => {
                if(!productoUpdate) return res.status(404).send(
                    {message:'El producto no existe para actualizar'});
                return res.status(200).send({producto:productoUpdate});
            })
            .catch(err => {
                 if (err.name === 'CastError') {
                    return res.status(404).send(
                        {message:'Formato de ID de producto no válido para actualizar.'});
                }
                return res.status(500).send({message:'Error al actualizar los datos', error: err});
            });
    },
    uploadImagen:function (req,res) {
        var productoId=req.params.id;
        var fileName='Imagen no subida...';

        if(req.files){
            var filePath=req.files.imagen.path;
            var file_split=filePath.split('\\'); 
            var fileName=file_split[file_split.length - 1]; 
            
            var extSplit=fileName.split('\.');
            var fileExt=extSplit[extSplit.length - 1]; 
            if(fileExt=='png' || fileExt=='jpg' || fileExt=='jpeg' || fileExt=='gif'){
                Producto.findByIdAndUpdate(productoId,{imagen:fileName},{new:true})
                    .then(productoUpdated => {
                        if (!productoUpdated) {
                            // Eliminar archivo temporal si no se encuentra el producto
                            fs.unlink(filePath, (unlinkErr) => { 
                                return res.status(404).send(
                                    {message: 'El producto no existe y no se subió la imagen'});
                            });
                        } else {
                            return res.status(200).send({producto: productoUpdated});
                        }
                    })
                    .catch(err => {
                        // Eliminar archivo temporal si hay error de DB
                        fs.unlink(filePath, (unlinkErr) => { 
                            if (unlinkErr) console.error('Error al eliminar archivo temporal:', unlinkErr);
                            if (err.name === 'CastError') {
                                return res.status(404).send(
                                    {message:'Formato de ID de producto no válido para subir imagen.'});
                            }
                            return res.status(500).send({
                                message: 'Error al subir la imagen o actualizar el producto', error: err});
                        });
                    });
            }else{
                fs.unlink(filePath,(err)=>{
                    if(err) console.error('Error al eliminar archivo con extensión no válida:', err); 
                    return res.status(200).send(
                        {message:'La extensión no es válida, archivo eliminado.'}); 
                });
            }
        }else{
            return res.status(400).send({ 
                message:'No se ha subido ninguna imagen.'
            });
        }
    },
    getImagen:function(req,res){
        var file=req.params.imagen;
        var path_file='./uploads/'+file; 
// si fs.exists está obsoleto, mejor usar fs.promises.access o fs.stat dependiendo si da error o no
        fs.exists(path_file,(exists)=>{ 
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(404).send({message:'No existe la imagen'});
            }
        });
    }
}
module.exports=controller;
