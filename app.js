var express=require('express');
var mysql=require('mysql');
var dotenv  = require('dotenv');
var path= require('path');
dotenv.config({ path:'./.env'});
var app= express();



var db=mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE 
});


var publicDirectory= path.join(__dirname,'./public');
app.use(express.static(publicDirectory));
app.use(express.urlencoded({ extended:false }));
app.use(express.json());
app.set('view engine','hbs');
app.use('/', require('./routes/pages'));
app.use('/auth',require('./routes/auth'));

db.connect(function (error) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("Mysql connected...");
        }
    });

    
app.listen(5001,function () {
        console.log("Server started on port 5001");
    });