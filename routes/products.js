var express = require('express');
var router = express.Router();
const productModel= require('../models/productModel');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const resultado = await  productModel.find();
  res.send(resultado);
});

//Agregar producto
router.post('/', async function(req, res, next) {
  let datos = {
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
    images: req.body.images
  };

  let product = new productModel(datos);
  let resultado = product.save();

  res.send("Registro agregado exitosamente");
});

//Editar productos
router.put('/', async function(req, res, next) {
  const filter = {id: req.query.id}; //Condición de Query
  const update = {name: req.query.name}; //Campos a modificar
  const resultado = await productModel.findOneAndUpdate(filter, update, {
    new:true,
    upsert: true
  });
  res.send("Se actualizo su producto");
});

//Eliminar productos
router.delete('/:id', async function(req, res, next) {
  const resul = await productModel.find({id: req.params.id}).exec();
  await productModel.deleteOne({id: req.params.id});
  if (resul.length > 0) {
    await productModel.deleteOne({id: req.params.id});
    res.json("Se eliminó el producto");
  } else {
    res.json({error: "No se encontró el producto con Id " + req.params.id})
  }
});


module.exports = router;
