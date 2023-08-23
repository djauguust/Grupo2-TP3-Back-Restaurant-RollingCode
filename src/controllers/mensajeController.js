const Mensajes = require("../models/mensajes.model")


//GET
const getMessage = async (req,res)=>{
  console.log("getMessage controller reached");
  try {
    const allMessage = await Mensajes.find()
    res.status(200).json(allMessage)

  } catch (error) {
    res.status(404).json({message: "Error al obtener los mensajes"})    
  }
}

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
const createMessage = async (req,res)=>{
  try {
    const {nombre, email, mensaje} = req.body
    const nuevoMensaje = new Mensajes({
      nombre,
      email,
      mensaje,
      date: new Date().toISOString(),
      leido : false
    })

    await nuevoMensaje.save()
    res.status(201).json({message: "Mensaje Creado"})
    
  } catch (error) {
    res.status(404).json({message:error.massage})
  }
}



// //DELETE
// const deleteMessage = async (req, res) => {
//   try {
//     const userId = req.params.userId
//     const messageId = req.params.messageId

//     // Buscar y borrar el mensaje solo si pertenece al usuario
//     const deletedMessage = await Mensajes.findOneAndDelete({ _id: messageId, userId });

//     if (!deletedMessage) {
//       return res.status(404).json({ message: "Mensaje no encontrado o no pertenece al usuario" });
//     }

//     res.status(200).json({ message: "Mensaje borrado exitosamente" });
//   } catch (error) {
//     res.status(500).json({ message: "Error al borrar el mensaje" });
//   }
// };

module.exports = {
  getMessage,
  createMessage,
  // getMessageByUser,
  // deleteMessage
}