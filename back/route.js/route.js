const keyPublishable = '****************************************'; // Enter the key here
const keySecret = '*******************************'; // enter the secret here
const stripe = require("stripe")("sk_test_szr6vR2bPleLHXjG8FprmCuR00aMNKuw2a");
const stripeChargeCallback = res => (stripeErr, stripeRes) => { 
    if (stripeErr) { 
      res.status (500) .send ({erreur: stripeErr}); 
    } else { 
      res.status (200) .send ({success: stripeRes}); 
    } 
  };
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
        // const { errors, isValid } = validateRegisterInput(req.body);
        var id;
        if(use.length==0){
            id=0
        }
        else{
            id=parseInt(use[use.length-1]._id+1)
        }
        // if(!isValid) {
        //     return res.status(200).json(errors);
        // }
         Individu.findOne({
            pseudo: req.body.pseudo
        }).then(user => {
            if(user) {
                console.log(user)
              res.send(
                     'pseudo non disponible essayer un autre'
                );
            }
            else {
                 const avatar = gravatar.url(req.body.pseudo, {
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
                    lieu: req.body.lieu,
                    sex: req.body.sex,
                    metier: req.body.metier,
                    ancquartier: req.body.ancquartier,
                    nouvquartier: req.body. nouvquartier,
                    adresse: req.body.adresse,
                    image:"http://localhost:8080/public/init.jpg",
                    telephone: req.body.telephone,
                    password: req.body.password,
                    avatar
                });
                bcrypt.genSalt(10, (err, salt) => {
                    if(err) console.error('There was an error', err);
                    else {
                        bcrypt.hash(individu.password, salt, (err, hash) => {
                            if(err){
                                res.send("les 2 mots de passes ne sont pas identiques")
                            } 
                            else {
                                individu.password = hash;
                                individu
                                    .save()
                                    .then(user => {
                                        res.json(user)
                                        console.log(user)
                                    }); 
                            }
                        });
                    }
                });
            }
        })
               
            
        
    })

   
});
router.post("/photo/:_id",(req,res)=>{
    Individu.findById(req.params._id).then(use=>{
        let imageFile1 = req.files.image;
                
                
                  imageFile1.mv(`${__dirname}/public/${req.params._id}.jpg`, function(err) {
                    if (err) {
                      return res.status(500).send("err");
                    }
                 
        Individu.findOneAndUpdate({_id:req.params._id}, {
           
            image:"http://localhost:8080/public/"+req.params._id+".jpg"
        
        },{new:true}).then(upd=>res.send(upd)
        )
    })
})
})
router.post("/photocapture/:_id",(req,res)=>{           
        Individu.findOneAndUpdate({_id:req.params._id}, {
           
            image:req.body.base
        
        },{new:true}).then(upd=>res.send(upd)
        )
   

})
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
                res.send('User not found')
                // errors.pseudo = 'User not found'
                // return res.status(404).json(errors);
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
                                        lieu: user.lieu,
                                        nouvquartier: user.nouvquartier,
                                        image: user.image,
                                        success: true,
                                        token: `Bearer ${token}`
                                    });
                                    router.get('/user/:_id',(req,res)=>{
                                       Individu.findById(req.params._id).then(user=>res.send(user))
                                    })
                                }
                            });
                        }
                        else {
                            res.send('Incorrect Password')
                            // errors.password = 'Incorrect Password';
                            // return res.status(400).json(errors);
                        }
                    });
        });
});
router.post("/", (req, res) => {
    const body = {
      source: req.body.token.id,
      amount: req.body.amount,
      currency: "usd"
    };
    console.log(body);
    
    stripe.charges.create(body, stripeChargeCallback(res));
});
router.get('/user',(req,res)=>{
    Individu.find().then(user=>res.send(user))
})
router.get('/user/:_id',(req,res)=>{
   Individu.findById(req.params._id).then(user=>res.send(user))
})

       router.get('/public/:image',(req,res)=>{
      var fs =require("fs")
      var image=fs.readFileSync("./route.js/public/"+req.params.image
        )
      res.send(image)
        })
       router.get('/public/init.jpg',(req,res)=>{
      var fs =require("fs")
      var image=fs.readFileSync("./route.js/public/init.jpg"
        )
      res.send(image)
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