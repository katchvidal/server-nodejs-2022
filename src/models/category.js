const { Schema, model } = require("mongoose");

//  Fields doc Moongse Types
const categorySchema = Schema({
    name:   { type: String, required: true },
    icon:   { type: String },
    color:  { type: String },
})

const Category = model('Category', categorySchema)
module.exports = { Category }