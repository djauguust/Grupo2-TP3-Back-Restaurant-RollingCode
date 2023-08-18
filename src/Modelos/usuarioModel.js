const mongoose = require("mongoose")
const {Schema} = mongoose

const rolesPermitidos = ["usuario", "admin", "portero"];

const usuarioEsquema = new Schema ({
    nombre: {
        type: String, //Tipo de dato
        required: true,
        max: 12,
        min:3,
        trim: true, //Elimina espacios
        validate: {
            validator: function (v) {
                // Expresión regular para permitir solo letras
                return /^[a-zA-Z ]+$/.test(v);
            },
            message: props => `${props.value} no es un nombre válido. Debe contener solo letras.`
        }
    },
    Apellido: {
        type: String, //Tipo de dato
        required: true,
        max: 12,
        min:3,
        trim: true, //Elimina espacios
        validate: {
            validator: function (v) {
                // Expresión regular para permitir solo letras
                return /^[a-zA-Z ]+$/.test(v);
            },
            message: props => `${props.value} no es un Apellido válido. Debe contener solo letras.`
        }
    },
    email: {
        type: String, //Tipo de dato
        required: true,
        max: 12,
        min:3,
        trim: true, //Elimina espacios
        unique: true, //Permite que este dato sea unico en la base de datos
        validate: {
            validator: function (v) {
                // Expresión regular para permitir solo letras
                return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(v);
            },
            message: props => `${props.value} no es un Email válido.`
        }
    },
    contraseña: {
        type: String, //Tipo de dato
        required: true,
        max: 12,
        min:3,
        trim: true, //Elimina espacios
        validate: {
            validator: function (v) {
                // Expresión regular para permitir solo letras
                return /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(v);
            },
            message: props => `${props.value} no es un Email válido.`
        }
    },
    Activo : {
        type: Boolean, // Tipo de dato booleano (true o false)
        required: true, // Requerido
    },
    Rol: {
        type: String, //Tipo de dato
        required: true,
        trim: true, //Elimina espacios
        validate: {
            validator: function (value) {
              return rolesPermitidos.includes(value.toLowerCase());
            },
            message: "El campo 'Rol' debe ser uno de los siguientes valores: usuario, admin, portero",
          },
    }
},{
    versionKey: false,
    collection: `Usuarios`
})

const UsuarioModel = mongoose.model("Usuarios", usuarioEsquema)

module.exports= UsuarioModel