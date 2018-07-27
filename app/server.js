var express = require("express");
var path = require("path");
var mysql = require("mysql");
var bodyParser = require("body-parser");


let connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'korova'
})


let app = express();
connection.connect(function (err) {
    if (err){
       throw err  
    }  
    console.log('connection is OK')
})


app.use(bodyParser.json())

app.listen('8080', function () {
    console.log('listen to port 8080')
})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//req - передаєм
//res - отримуєм

app.get('/getCategory', function(req, res){
    connection.query('SELECT * FROM korova.category;', function(err, rows, fields){
         res.json(rows); 
    })
})

app.get('/getProducts', function(req, res){
    connection.query('SELECT * FROM korova.product;', function(err, rows, fields){
         res.json(rows); 
    })
})

app.get('/getBurgers', function(req, res){
    connection.query('select * from product where product_category_id = 1;', function(err, rows, fields){
         res.json(rows); 
    })
})

app.get('/getVegan', function(req, res){
    connection.query('select * from product where product_category_id = 2;', function(err, rows, fields){
         res.json(rows); 
    })
})

app.get('/getOther', function(req, res){
    connection.query('select * from product where product_category_id = 5;', function(err, rows, fields){
         res.json(rows); 
    })
})

app.get('/getDrinks', function(req, res){
    connection.query('select * from product where product_category_id = 6;', function(err, rows, fields){
         res.json(rows); 
    })
})




