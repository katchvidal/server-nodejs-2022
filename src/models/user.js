const { Schema, model } = require("mongoose");

//  Fields doc Moongse Types
const userSchema = Schema({

})

const User = model('User', userSchema)
module.exports = { User }