const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt2 = require('jwt-simple');
const passport = require('passport');
const request=require("request")
const validateRegisterInput = require('../register');
const validateRegisterInput2 = require('../atelier');
const validateLoginInput = require('../login');
// const Donor = require('../modele/payment.modele.js')
const initializePayment = require('../payment')(request);
const Individu = require('../modele/modele.individu');
const Particulier = require('../modele/modele.particulier');
const Cuisinier = require('../modele/modele.cuisinier');
const Chart = require('../modele/modele.chart');
const Tableau = require('../modele/modele.tableau');
router.post('/register', function(req, res) {
    Individu.find().then(use=>{
        const { errors, isValid } = validateRegisterInput(req.body);
        var id;
        if(use.length==0){
            id=0
        }
        else{
            id=parseInt(use[use.length-1]._id+1)
        }
        if(!isValid) {
            return res.status(400).json(errors);
        }
         Individu.findOne({
            pseudo: req.body.pseudo
        }).then(user => {
            if(user) {
                return res.status(400).json({
                    pseudo: 'pseudo non disponible essayer un autre'
                });
            }
            else {
                 const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                });
                const individu= new Individu({
                    _id:id,
                    nom: req.body.nom,
                    prenom: req.body.prenom,
                    pseudo: req.body.pseudo,
                    birthday: req.body.birthday,
                    ancquartier: req.body.ancquartier,
                    nouvquartier: req.body. nouvquartier,
                    adresse: req.body.adresse,
                    telephone: req.body.telephone,
                    password: req.body.password,
                    avatar
                });
                
                bcrypt.genSalt(10, (err, salt) => {
                    if(err) console.error('There was an error', err);
                    else {
                        bcrypt.hash(individu.password, salt, (err, hash) => {
                            if(err) console.error('There was an error', err);
                            else {
                                individu.password = hash;
                                individu
                                    .save()
                                    .then(user => {
                                        res.json(user)
                                    }); 
                            }
                        });
                    }
                });
            }
        })
               
            
        
    })

   
});

router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const pseudo = req.body.pseudo;
    const password = req.body.password;

    Individu.findOne({pseudo})
        .then(user => {
            if(!user) {
                errors.pseudo = 'User not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if(isMatch) {
                            const payload = {
                                id: user.id,
                                nom: user.nom,
                                nouvquartier: user.nouvquartier,
                                avatar: user.avatar
                            }
                            jwt.sign(payload, 'secret', {
                                expiresIn: 3600
                            }, (err, token) => {
                                if(err) console.error('There is some error in token', err);
                                else {
                                    res.json({
                                        id:user.id,
                                        nom:user.nom,
                                        prenom: user.prenom,
                                        adresse: user.adresse,
                                        telephone: user.telephone,
                                        birthday: user.birthday,
                                        nouvquartier: user.nouvquartier,
                                        success: true,
                                        token: `Bearer ${token}`
                                    });
                                }
                            });
                        }
                        else {
                            errors.password = 'Incorrect Password';
                            return res.status(400).json(errors);
                        }
                    });
        });
});
router.get('/cuisine',(req,res)=>{
    Cuisinier.find().then(user=>res.send(user))
})
router.get('/user/:_id',(req,res)=>{
   Individu.findById(req.params._id).then(user=>res.send(user))
})
router.post("/cuisinier/:_id",(req, res) => {
    res.setHeader('Content-type', 'text/plain');
    Cuisinier.findById(req.params._id).then(user=>{
        
        if(!user){
            res.send("intouvable")
        }
        else{
            Atelier.find().then(use=>{
                // const { errors, isValid } = validateRegisterInput2(req.body);
                var id;
                if(use.length==0){
                    id=0
                }
                else{
                    id=use[use.length-1]._id+1
                }
                // if(!isValid) {
                //     return res.status(400).json(errors);
                // }
                let imageFile1 = req.files.image;
                console.log(req.files);
                
                  imageFile1.mv(`${__dirname}/public/${req.body.titre}.jpg`, function(err) {
                    if (err) {
                      return res.status(500).send("err");
                    }
                                  })
                  
                        const atelier = new Atelier({
                            _id:id,
                            id2:user._id,
                            titre: req.body. titre,
                            description: req.body.description,
                            date: req.body.date,
                            horaire: req.body.horaire,
                            placedispo:req.body.placedispo,
                            placereserve:0,
                            prix:req.body.prix,
                            image:req.body.titre+".jpg",
                            visibilite:true
                            
                        });
                      

   
  
                        
                                        atelier
                                            .save()
                                            .then(user => {
                                                res.json(user)
                                            }).catch(use=>console.log("ereue")
                                            ) 
                                    
                                });   
        }
     
    })
})
  


module.exports = router;