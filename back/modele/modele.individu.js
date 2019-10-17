const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const IndividuSchema = new Schema({
    _id:{
        type:Number
    },
    pseudo: {
        type: String,
    },
    nom: {
        type: String,
    },
   prenom: {
        type: String,
      
    },
    birthday: {
        type:  String,
        
    },
     lieu: {
        type:  String,
        
    },
     sex: {
        type:  String,
        
    },
     metier: {
        type:  String,
        
    },
   ancquartier: {
        type: String,
    },
     nouvquartier: {
        type: String,
    },
    adresse: {
        type: String,
    },
    image:{
        type:String
    },

   telephone: {
        type: Number,
       
    },
    password: {
        type: String,
      
    },
    avatar: {
        type: String
    },
     base: {
        type: String
    },


    
});

const User = mongoose.model('individu',  IndividuSchema );

module.exports = User;