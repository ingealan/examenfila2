'use strict'
var express= require('express');
var ProductoController=require('../controllers/tienda');
//define rutas especificas dentro de la aplicacion
var router = express.Router();
//subida de archivos multipart/form-data
var multipart=require('connect-multiparty');
var multiPartMiddleware= multipart({uploadDir:'./uploads'});

//pagina de inicio
router.get('/home', ProductoController.home);
//guardar informacion de producto
router.post('/guardar-producto', ProductoController.saveProducto);
//ver informacion de los productos
router.get('/productos', ProductoController.getProductos);
//obtener datos de un producto
router.get('/producto/:id', ProductoController.getProducto);
//eliminar producto
router.delete('/producto/:id', ProductoController.deleteProducto);
//actualizar producto
router.put('/producto/:id', ProductoController.updateProducto);
//Agregar imagenes
router.post('/subir-imagen/:id', multiPartMiddleware, ProductoController.uploadImagen);
//cargar imagenes
router.get('/get-imagen/:imagen', ProductoController.getImagen);
module.exports=router;
