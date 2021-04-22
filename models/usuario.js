const {Schema, model} = require('mongoose')

const UsuarioSchema = Schema({
    nombre:{
        type: 'string',
        require: true
    },
    email:{
        type: 'string',
        require: true,
        unique: true
    },
    password:{
        type: 'string',
        require: true
    },
    img:{
        type: 'string'
    },
    role:{
        type: 'string',
        require: true,
        default: 'USER_ROLE'
    },
    google:{
        type: Boolean,
        require: false
    }
})

UsuarioSchema.method('toJSON', function(){
    const{__v, _id, password, ...object} = this.toObject();
    object.uid = _id
    return object
})
module.exports = model('Usuario',UsuarioSchema);
