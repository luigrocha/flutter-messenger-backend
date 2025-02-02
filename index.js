const express = require('express');
const path = require('path');
require('dotenv').config();

const {dbConnection} =require('./database/config');

dbConnection();

// App de Express
const app = express();

// Lectura y Parseo del body

app.use(express.json());

// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');




// Path público
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ) );


// Routes

app.use('/api/login', require('./routes/auth'))


server.listen( process.env.PORT, ( err ) => {

    if ( err ) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT );

});


