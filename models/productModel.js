let mongo = require('mongoose');

const productSchema= new mongo.Schema({
    id: Number,
    name: {type: String, required:true},
    description: {type: String, required:true},
    Price: {type: Number, min:0},
    Stock: Number,
    images: [String],
});

module.exports = mongo.model('Producto', productSchema);