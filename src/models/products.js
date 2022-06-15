const { Schema, model } = require("mongoose");

//  Fields doc Moongse Types
const productSchema = Schema({
    name: String,
    image: String,
    countInStock : Number,
})

const Product = model('Product', productSchema)
module.exports = { Product }
