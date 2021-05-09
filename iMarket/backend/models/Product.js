const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    uid: {
        type:String
    },

    name: {
        type: String
    },

    email: {
        type: String
    },
    
    title: {
        type: String,
        
    },
    description: {
        type: String,
        
    },
    price: {
        type: Number,
    
    },
    city: {
        type: String,
        
    },
    state: {
        type: String,
        
    },
    zip: {
        type: Number,
        
    },
    phoneNumber: {
        type: Number,
    },
    images: {
        type: Array,
       
    },

});

module.exports = mongoose.model('Products', ProductSchema);