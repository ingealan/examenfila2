//codigo mas estricto y seguro
'use strict'
var moongose=require('mongoose');
var port='3600';
//promesa nativas de JavaScript
moongose.Promise=global.Promise;
//Importacion de tu aplicacion de express
var app=require('./app')
//conexion a la base de datos
moongose.connect('mongodb://localhost:27017/tienda')
.then(()=>{
    console.log("Conexion establecida con la bdd");
    app.listen(port,()=>{
        console.log("Conexion establecida en la url: 3600");
    })
})
.catch(err=>console.log(err))