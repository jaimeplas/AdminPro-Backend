const jwt = require('jsonwebtoken');

const validatJWT = (req, res, next) => {
    //LEER EL ROKEN
    const token = req.header('x-token')

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'No hay Token'
        })
    }

    try {
        console.log(token)
        const { uid } = jwt.verify(token, process.env.JWT_SECRET)

        res.uid = uid
        res.token = token

        next()
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg: 'Token no valido' + error
        })
        
    }
    
}

module.exports={
    validatJWT
}