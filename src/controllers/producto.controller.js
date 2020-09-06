const Producto = require('../models/producto');
const Categoria = require('../models/categoria');
const mongoose = require('mongoose');

listarProductoCategoria = async (req, res) => {
    let categoria = req.query.categoria;

    try {
        const productos = await Producto.find({ categoria_id: categoria })

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

module.exports = {
    listarProductoCategoria,
    listarCategorias
}
