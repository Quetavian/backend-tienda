//Conexión con MongoDB usando Mongoose
// src/config/db.js

const mongoose = require("mongoose"); //Se importa la librería moongose para facilitar la conexión y la interacción con MongoDB.

//Cargar las variables de entorno
require('dotenv').config( { path: './.env' });

//Obtener la URI desde el archivo .env
const uri = process.env.DB_URI; //String de conexión a clúster de MongoDB en Atlas. Por orden incluye: usuario:contraseña@clusterAtlas/base_de_datos

const clientOptions = {
  serverApi: {
    version: "1",
    strict: true, //Modo estricto en la comunicación con el servidor.
    deprecationErrors: true,  //Aquí se fuerza a que muestre errores si se usan funcionalidades obsoletas (deprecated)
  },
};

async function connectDB() {
  //Se declara coonectDB como función asíncrona
  try {
    //Se inicia try para capturar posibles errores en la conexión
    // Conecta a MongoDB
    await mongoose.connect(uri, clientOptions); //Conexión a MongoDB usando la uri y las clientOptions definidas anteriormente
    // Opcional: hacer un ping para verificar la conexión
    await mongoose.connection.db.admin().command({ ping: 1 }); //Se comprueba si la conexión es exitosa haciendo un ping
    console.log("Conexión a MongoDB exitosa");
  } catch (error) {
    //En caso de error en el bloque try se captura
    console.error("Error al conectar con MongoDB:", error); //Lo muestra en consola
    process.exit(1); //Y se finaliza el proceso
  }
}

// Exportamos la función para poder usarla en server.js
module.exports = connectDB;
