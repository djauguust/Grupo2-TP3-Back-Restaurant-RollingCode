const UsuarioModel = require("../Modelos/usuarioModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//Login

const Login = async (req,res,next) => {
    const user = await UsuarioModel.findOne({email: req.body.email})
    if (!user){
        return res.status(404).send("Usuario y/o contraseña incorrectos")
    }
    const match = await bcrypt.compare(req.body.contraseña, user.contraseña)
    if(!match){
        return res.status(404).send("Usuario y/o contraseña incorrectos")
    }

    //Creacion del Token
    const token = jwt.sign({
        id: user._id,
        rol : user.rol
    },
    process.env.SECRET_KEY,
    {expiresIn: "1D"}
    )

    res.header("auth-token", token).json({
        error:null,
        data: {token}
    })
}

module.exports = {
    Login
}