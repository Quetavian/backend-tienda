// src/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

app.use(cors()); //Para poder hacer peticiones desde terminal del navegador

// Middleware para parsear JSON
app.use(express.json());

// Rutas de la API
app.use('/api/products', productRoutes);

// Middleware para manejo de errores (siempre al final)
app.use(errorHandler);

// Función para iniciar el servidor de forma asíncrona
async function startServer() {
  try {
    // Espera a que la conexión a la base de datos se establezca
    await connectDB();

    // Inicia el servidor
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Servidor iniciado en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

// Ruta para la URL raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de la tienda');
  });

startServer();