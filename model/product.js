const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    productType : {
        type : String,
        required : true
    },
    releaseDate : {
        type : Date,
        required : true,
        default : Date.now
    }
})

module.exports = mongoose.model('Product', productSchema)
