'use strict'

var express=require('express');
var bodyParser = require("body-parser");

var app=express();
var tienda_routes=require('./routes/tienda');
//todo lo que llega se convierte en json
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//configuracion de cabeceras
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers',
        'Autorization, X-API-KEY, X-Request-Width, Content-Type, Accept, Access-Control-Allow, Request-Method');
        res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
        res.header('Allow','GET,POST,OPTIONS,PUT,DELETE');
        next();
});

app.use('/',tienda_routes);

module.exports=app; 
