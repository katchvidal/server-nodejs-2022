const { Schema, model } = require("mongoose");

//  Fields doc Moongse Types
const categorySchema = Schema({

})

const Category = model('Product', categorySchema)
module.exports = { Category }