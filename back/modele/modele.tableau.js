const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TableauSchema = new Schema({
    _id:{
        type:Number
    },
    
    A: {
        type: String,
    },
   B: {
        type: String,
      
    },
    C: {
        type:  String,
        
    },
    D: {
        type: String,
    },
    E: {
        type: String,
    },

    F: {
        type: Number,
       
    },
    G: {
        type: Number,
      
    },H: {
        type: Number,
       
    },
    I: {
        type:String
    },

    J: {
        type:String
    },
     K: {
        type:String
    },
     

    visibilite: {
        type:Boolean,
      
    },

    
});

const User = mongoose.model('tableau',  TableauSchema);

module.exports = User;