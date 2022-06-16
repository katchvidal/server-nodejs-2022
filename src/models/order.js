const { Schema, model } = require("mongoose");

//  Fields doc Moongse Types
const orderSchema = Schema({

})

const Order = model('Order', orderSchema)
module.exports = { Order }