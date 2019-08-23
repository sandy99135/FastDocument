const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChartSchema = new Schema({
    _id:{
        type:Number
    },
    lundi: {
        type: Number,
    },
   mardi: {
        type: Number,
      
    },
   mercredi: {
        type:  Number,
        
    },
    jeudi: {
        type: Number,
    },
    vendredi: {
        type: Number,
    },

    samedi: {
        type: Number,
       
    },
    dimanche: {
        type: Number,
      
    }

    
});
const User = mongoose.model('chart',  ChartSchema);

module.exports = User;