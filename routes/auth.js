/*
    RUTA: /api/login
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/', [
    check('email', 'El Correo es obligatorio').notEmpty(),
    check('password', 'El password es obligatorio').notEmpty(),
    validarCampos
], login)

module.exports = router