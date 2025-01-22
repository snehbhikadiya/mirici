const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trendyProductSchema = new Schema({
    images:[ String], // Array of base64 strings
    productName: {type:String,require},
    productPrice: {type:Number,require},
    discription:{type:String,require}
});

const TrendyProduct = mongoose.model('TrendyProduct', trendyProductSchema);

module.exports = TrendyProduct;
