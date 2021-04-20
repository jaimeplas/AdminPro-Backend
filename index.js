require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Crear el servidor de Express
const app = express();

// Configurar CORS
app.use(cors());

// Base de datos
const {dbConnection} = require('./database/config')
dbConnection();

//Rutas
app.get('/', (req, res)=>{
    res.json({
        ok: true,
        msg: 'Hola Mundo'
    })
})



app.listen(process.env.PORT, ()=> {
    console.log('Servidor Corriendo en Puerto ' + process.env.PORT)
})