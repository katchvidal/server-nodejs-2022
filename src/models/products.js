const { Schema, model } = require('mongoose')

//  Fields doc Moongse Types
const productSchema = Schema({
    name:               { type: String,required: true,},
    image:              { type: String, required: true, default: '' },
    images:             [ { type: String }],
    price:              { type: Number, required: true, default: 0 },
    description:        { type: String, required: true },
    richDescription:    { type: String, default: '' },
    countInStock:       { type: String, required: true, min: 0 },
    rating:             { type: Number, default: 0 },
    numReviews:         { type: Number, default: 0 },
    isFeatured:         { type: Boolean, default: false },
    category:           { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    dateCreated:        { type: Date, default: Date.now },
})

const Product = model('Product', productSchema)
productSchema.virtual('').get( function (){
    return this._id.toHexString();
})
productSchema.set('toJSON', {
    virtuals: true
})
module.exports = { Product }
