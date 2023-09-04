const Mensajes = require("../models/mensajes.model");

//GET
const getMessage = async (req, res) => {
  console.log("getMessage controller reached");
  try {
    const allMessage = await Mensajes.find();
    res.status(200).json(allMessage);
  } catch (error) {
    res.status(404).json({ message: "Error al obtener los mensajes" });
  }
};

// const getMessageByUser = async (req,res)=>{
//   try{
//     const userId = req.params.userId
//     const mensaje = await Mensajes.find({userId})
//     res.status(200).json(mensaje)
//   } catch(error){
//     res.status(500).json({message: "Error al obtener los mensajes del usuario"})
//   }
// }

// POST
const createMessage = async (req, res) => {
  try {
    const { nombre, email, mensaje } = req.body;
    const nuevoMensaje = new Mensajes({
      nombre,
      email,
      mensaje,
      date: new Date().toISOString(),
      leido: false,
    });

    await nuevoMensaje.save();
    res.status(201).json({ message: "Mensaje Creado" });
  } catch (error) {
    res.status(404).json({ message: error.massage });
  }
};

//PUT
const editMessage = async (req, res) => {
  try {
    const id = req.params.messageId;
    const mensaje = await Mensajes.findById(id);
    if (mensaje) {
      mensaje.nombre = req.body.nombre || mensaje.nombre;
      mensaje.email = req.body.email || mensaje.email;
      mensaje.mensaje = req.body.mensaje || mensaje.mensaje;
      mensaje.leido = req.body.leido || mensaje.leido;
      await mensaje.save();
      res.status(200).json({ message: "Mensaje actualizado" });
    } else {
      res.status(404).json({ error: "Mensaje no encontrado" });
    }
  } catch (error) {
    console.log(error);
  }
};

// //DELETE
const deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.messageId;

    // Buscar y borrar el mensaje solo si pertenece al usuario
    const deletedMessage = await Mensajes.findOneAndDelete({ _id: messageId });

    res.status(200).json({ message: "Mensaje borrado exitosamente" });
  } catch (error) {
    res.status(404).json({ message: "Mensaje no encontrado" });
  }
};

module.exports = {
  getMessage,
  createMessage,
  deleteMessage,
  editMessage,
  // getMessageByUser,
};
