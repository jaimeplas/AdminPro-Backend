const {response} = require('express')
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt')

const getUsuarios = async(req, res)=>{
    const usuarios = await Usuario.find({}, 'nombre email role google ');
    res.json({
        ok: true,
        usuarios,
        uid: req.uid,
        token: req.token
    })
}

const postUsuarios = async(req, res = response)=>{
    const {nombre, email, password} = req.body;

    try{
        const existeEmail = await Usuario.findOne({email})
        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            })
        }

        const usuario = new Usuario(req.body);
        
        //Encriptar Password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt)

        //Guardar Usuario
        await usuario.save();

        //Generar TOKEN
        const token = await generarJWT(usuario._id)

        res.json({
            ok: true,
            usuario,
            token
        })
    }catch(error){
        console.log(erro)
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado... Revisar logs'
        })
    }
}

const putUsuarios = async(req, res = response)=>{
    // TODO: validar token y comprobar si el usuario es correcto
    
    const uid = req.params.id;

    try{
        const usuarioDB = await Usuario.findById(uid)

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuatio con este Id'
            })
        }
       
        // Actualizar
        const {password, google, email, ...campos} = req.body        
        if(usuarioDB.email !== email){
            const existeEmail = await Usuario.findOne({email: email})
            if (existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: "Ya existe un usuario con ese Email"
                })
            }
        }
        campos.email = email

       const UsuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true})

        res.json({
            ok: true,
            Update: 'OK',
            Usuario: UsuarioActualizado
        })
    }catch(error){
        console.log(erro)
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado... Revisar logs',
            uid
        })
    }
}

const deleteUsuarios = async(req, res = response)=>{    
    const uid = req.params.id;

    try{
        const usuarioDB = await Usuario.findById(uid)

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuatio con este Id'
            })
        }

        // Eliminar
        if(usuarioDB.email !== email){
            const existeEmail = await Usuario.findOne({email: email})
            if (existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: "Ya existe un usuario con ese Email"
                })
            }
        }
        campos.email = email

       const UsuarioEliminado = await Usuario.findByIdAndDelete(uid)

        res.json({
            ok: true,
            Delete: 'OK',
            msg: 'Usuario Eliminado',
            Usuario: UsuarioEliminado
        })
    }catch(error){
        console.log(erro)
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado... Revisar logs',
            uid
        })
    }
}


module.exports={
    getUsuarios,
    postUsuarios,
    putUsuarios,
    deleteUsuarios
}