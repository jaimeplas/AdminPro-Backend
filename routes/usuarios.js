/*
    RUTA: /api/usuarios
*/
const { Router } = require('express');
const { getUsuarios, postUsuarios, putUsuarios, deleteUsuarios } = require('../controllers/usuarios')
const { validarCampos } = require('../middlewares/validar-campos')
const { check } = require('express-validator')
const { validatJWT } = require('../middlewares/validar-jwt')


const router = Router();

router.get('/', validatJWT, getUsuarios)

router.post('/', 
    [
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('password', 'El password es obligatorio').notEmpty(),
        check('email', 'El email tiene que ser valido y es obligatorio').isEmail(),
        validarCampos
    ], 
     postUsuarios
 )

 router.put('/:id',
    [
        validatJWT,
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('email', 'El email tiene que ser valido y es obligatorio').isEmail(),
        check('role', 'El Rol tiene que ser valido y es obligatorio').notEmpty(),
        validarCampos
    ], 
     putUsuarios
 )

 router.delete('/:id', validatJWT, deleteUsuarios)


module.exports = router