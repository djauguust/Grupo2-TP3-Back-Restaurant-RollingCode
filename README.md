<p align="center">
  <img src="https://live.staticflickr.com/65535/53174557368_553ef84886_n.jpg" alt="rest" title="rest">
</p> 

# Proyecto Restaurante RollinCode

<p>
Restaurante RollingCode es nuestro tercer proyecto que busca cumplir con las demandas y exigencias de la Academia RollingCodeSchool, donde tomamos libre albedrio para dar nuestro toque personal como grupo. Nuestro BackEnd tiene como objetivo:
</p>
- Crear un entorno efectivo para nuestra comunicacione entre FrontEnd y nuestra Base de datos.
- Tener control de los usuarios registrados, reservas realizadas del cliente, los mensajes recibidos del usuario.
- Brindar las herramientas necesarias para modificar y gestionar las configuraciones de nuestro restaurante.

### Guia de instalacion
#### Con este comando puedes clonar nuestro repositorio
`git clone https://github.com/djauguust/Grupo2-TP3-Back-Restaurant-RollingCode.git`

#### Instalar dependencias
`npm i`

#### Iniciar aplicacion
`npm start`

### Endpoints/API:
#### Endpoint de usuarios:
- Ruta: `/api/usuarios/`
 - Método HTTP: `POST`
 - Descripción: Este endpoint permite registrar un usuario.
- Ruta: `/api/login/`
 - Método HTTP: `POST`
 - Descripción: Este endpoint permite loguear un usuario.
- Ruta: `/api/usuarios/`
 - Método HTTP: `GET`
 - Descripción: Este endpoint permite obtener todos los usuarios.
- Ruta: `/api/usuarios/:id`
 - Método HTTP: `GET`
 - Descripción: Este endpoint permite obtener un usuario.
- Ruta: `/api/usuarios/:id`
 - Método HTTP: `PUT`
 - Descripción: Este endpoint permite editar datos del usuario.
- Ruta: `/api/contrasenia/:id`
 - Método HTTP: `PUT`
 - Descripción: Este endpoint permite editar la contraseña del usuario.
- Ruta: `/api/usuarios/:id`
 - Método HTTP: `DELETE`
 - Descripción: Este endpoint permite eliminar un usuario.  

#### Endpoint de reservas:
- Ruta: `/api/reservas`
 - Método HTTP: `POST`
 - Descripción: Este endpoint permite crear una reserva.
- Ruta: `/api/reservas/:id`
 - Método HTTP: `DELETE`
 - Descripción: Este endpoint permite eliminar una reserva.
- Ruta: `/api/reservas`
 - Método HTTP: `GET`
 - Descripción: Este endpoint permite obtener todas las reservas.
- Ruta: `/api/reservas/:fecha`
 - Método HTTP: `GET`
 - Descripción: Este endpoint permite obtener las reservas realizadas en una fecha.
- Ruta: `/api/reservas/:fecha/:hora`
 - Método HTTP: `GET`
 - Descripción: Este endpoint permite obtener las reservas realizadas teniendo en cuenta la fecha y hora.
- Ruta: `/api/reservas/:id`
 - Método HTTP: `PUT`
 - Descripción: Este endpoint permite editar una reserva.
- Ruta: `/api/reservas/usada/:id`
 - Método HTTP: `PUT`
 - Descripción: Este endpoint permite actualizar el estado de una reserva.

#### Endpoint de mensajes:
- Ruta: `/api/mensajes`
 - Método HTTP: `GET`
 - Descripción: Este endpoint permite obtener todos los mensajes al administrador.
- Ruta: `/api/mensajes`
 - Método HTTP: `POST`
 - Descripción: Este endpoint permite crear mensajes al usuario.
- Ruta: `/api/mensajes/:messageId`
 - Método HTTP: `PUT`
 - Descripción: Este endpoint permite editar mensajes y cambiar el estado de leído.
- Ruta: `/api/mensajes/:messageId`
 - Método HTTP: `DELETE`
 - Descripción: Este endpoint permite eliminar un mensaje.

#### Endpoint del restaurante:
- Ruta: `/api/restaurant`
 - Método HTTP: `GET`
 - Descripción: Este endpoint permite obtener información del restaurante.
- Ruta: `/api/restaurant`
 - Método HTTP: `PUT`
 - Descripción: Este endpoint permite actualizar información del restaurante.
- Ruta: `/api/restaurant/fecha/`
 - Método HTTP: `POST`
 - Descripción: Este endpoint permite al administrador agregar una fecha no disponible.
- Ruta: `/api/restaurant/fecha/`
 - Método HTTP: `DELETE`
 - Descripción: Este endpoint permite al administrador eliminar una fecha no disponible.

### Tecnologias y librerias usadas
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Babel](https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)


### Integrantes:
-- [Mauro Simon Jose](http://github.com/MauroSJ "Mauro Simon Jose") --
-- [Lucas Yudi](http://github.com/Yudi454 "Lucas Yudi") --
-- [Augusto Ismael](http://github.com/djauguust "Augusto Ismael") --
-- [Pedro Antich](http://github.com/PedroAntich "Pedro Antich") --
-- [Leonardo Castro](http://github.com/LeoAc92 "Leo") --
