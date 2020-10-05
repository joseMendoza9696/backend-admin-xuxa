const Producto = require('../models/producto');
const Categoria = require('../models/categoria');
const mongoose = require('mongoose');

listarProductoCategoria = async (req, res) => {
    let categoria = req.query.categoria;

    try {
        const productos = await Producto.find({ categoria_id: categoria }).
            sort({ precio: -1 });

        res.status(200).send(productos);
    } catch (e) {
        console.log(e)
        res.status(400).send(e);
    }
}

listarCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find({});

        res.status(200).send(categorias);
    } catch (e) {
        res.status(400).send(e);
    }
}

listarProductos = async (req, res) => {
    try {
        const productos = await Producto.find({});

        res.status(200).send(productos);
    } catch (e) {
        res.status(400).send(e);
    }
}

productoID = async (req, res) => {
    const id = req.params.id;

    try {
        const producto = await Producto.findById(id);

        res.status(200).send(producto);
    } catch (e) {
        res.status(400).send(e);
    }
}

module.exports = {
    listarProductoCategoria,
    listarCategorias,
    productoID,
    listarProductos
}
