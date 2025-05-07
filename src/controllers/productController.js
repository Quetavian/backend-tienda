// src/controllers/productController.js
const Product = require('../models/product');

// Obtener todos los productos
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    next(error); // Pasa el error al middleware de manejo de errores
  }
};

// Obtener un producto por ID
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (error) {
    next(error);
  }
};

// Crear un nuevo producto
exports.createProduct = async (req, res, next) => {
  try {
    const newProduct = new Product(req.body);
    const productSaved = await newProduct.save();
    res.status(201).json(productSaved);
  } catch (error) {
    next(error);
  }
};

// Actualizar un producto
exports.updateProduct = async (req, res, next) => {
  try {
    const productUpdated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!productUpdated) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(productUpdated);
  } catch (error) {
    next(error);
  }
};

// Eliminar un producto
exports.deleteProduct = async (req, res, next) => {
  try {
    const productDeleted = await Product.findByIdAndDelete(req.params.id);
    if (!productDeleted) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    next(error);
  }
};
