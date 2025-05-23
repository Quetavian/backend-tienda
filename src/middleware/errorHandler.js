// src/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({
      success: false,
      error: err.message || 'Error del Servidor',
    });
  };
  
  module.exports = errorHandler;