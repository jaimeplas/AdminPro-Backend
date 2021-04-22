require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Crear el servidor de Express
const app = express();

// Configurar CORS
app.use(cors());

//Lectura del Body
app.use(express.json() );

// Base de datos
const {dbConnection} = require('./database/config')
dbConnection();

//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT, ()=> {
    console.log('Servidor Corriendo en Puerto ' + process.env.PORT)
})

