import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jsPDF from 'jspdf';
import $ from 'jquery'
import domtoimage from 'dom-to-image';
import axios from "axios"
import "./App.css";
import "./acceuil.css";
import "./login.css";
import "./deconnect.css";
import "./residence.css";
import  "dom-to-image/dist/dom-to-image.min.js"
import { saveAs } from 'file-saver'
import Dashboard from "./components/Dashboard"
// import "./font-awesome.min.css"

// Check for token to keep user logged in

class App extends Component {
  constructor(){
    super()
    this.state={
      connect:false,
      username:"",
      nom:"",
      prenom:"",
      birthday:"",
      ancquartier:"",
      nouvquartier:"",
      adresse:"",
      telephone:"",
      password:"",
      password_confirm:"",
      profil:[]
    }
     this.handleChange= this.handleChange.bind(this)
    this.handleSubmit= this.handleSubmit.bind(this)
     this.handleConnect= this.handleConnect.bind(this)
      this.handleConnectRes= this.handleConnectRes.bind(this)
     this.handleDeconnect= this.handleDeconnect.bind(this)
  }
  handleChange(e){
  
    this.setState({ [e.target.name]: e.target.value });
    
  }
  handleSubmit(e){
    e.preventDefault()
    alert(this.uploadInput.files[0])
    const individu= {
                    nom: this.state.nom,
                    prenom: this.state.prenom,
                    pseudo: this.state.pseudo,
                    birthday: this.state.birthday,
                    ancquartier: this.state.ancquartier,
                    nouvquartier: this.state. nouvquartier,
                    image:this.uploadInput.files[0],
                    adresse: this.state.adresse,
                    telephone: this.state.telephone,
                    password: this.state.password,
                    password_confirm: this.state.password_confirm,
                }
    axios.post("http://localhost:8080/register",individu).
    then(res=>{
      console.log(res.data)
    })
  
  }
  componentDidMount(){
    axios.get("http://localhost:8080/user/"+localStorage.getItem("id")).then(res=>{
      this.setState({profil:res.data})
       this.setState({username:res.data.nom})
      this.setState({connect: localStorage.getItem("connect")})
       console.log(this.state.connect)
    })
  }
  handleConnect(e){
    e.preventDefault()
    console.log("connect")
    const individu= {
                    pseudo: this.state.pseudo,
                    password: this.state.password
                }
    axios.post("http://localhost:8080/login",individu).
    then(res=>{
      console.log(res.data)
       if(res.data=='User not found'){
        document.querySelector(".erreuruser").innerHTML="utilisateur introuvable"  
         }
      else if(res.data!=='User not found'&& res.data=='Incorrect Password'){
        document.querySelector(".erreuruser").innerHTML="" 
        document.querySelector(".erreurpassword").innerHTML="mot de passe incorrect"  
         }
     if(res.data!=='Incorrect Password' && res.data!=='User not found' ){
       document.querySelector(".erreurpassword").innerHTML="" 
    localStorage.setItem("id",res.data.id)
    localStorage.setItem("nom",res.data.nom)
    localStorage.setItem("connect",res.data.success)
    axios.get("http://localhost:8080/user/"+localStorage.getItem("id")).then(res=>{
      this.setState({profil:res.data})
      this.setState({connect: localStorage.getItem("connect")})
      this.setState({username:res.data.nom})
      console.log(this.state.connect)
    })
     this.setState({connect:true})
    document.querySelector(".connect").style.display="none"
      }
   
    
    })
     
  
  }
   handleConnectRes(e){
    e.preventDefault()
    console.log("connect")
    const individu= {
                    pseudo: this.state.pseudo,
                    password: this.state.password
                }
    axios.post("http://localhost:8080/login",individu).
    then(res=>{
    localStorage.setItem("id",res.data.id)
    localStorage.setItem("nom",res.data.nom)
    localStorage.setItem("connect",res.data.success)
    axios.get("http://localhost:8080/user/"+localStorage.getItem("id")).then(res=>{
    console.log(res.data)
    this.setState({profil:res.data})
    this.setState({connect: localStorage.getItem("connect")})
    })
    })
     this.setState({connect:true})
     document.querySelector(".connect").style.display="none"
     document.querySelector(".residence").style.display="block"
     document.querySelector(".residence").style.top="0"
     document.querySelector(".inscription2").style.display="block"
   
  }
  handleDeconnect(e){
    e.preventDefault()
    localStorage.removeItem("id")
    localStorage.removeItem("nom")
    localStorage.removeItem("connect")
    this.setState({connect:false})
    document.querySelector(".deconnect").style.display="none"
  }
  render() {

   let sty={
    color:"white"
   }
   let styl={
    background:"linear-gradient(40deg,#c700fa,#eb2af3,#d793c7)"
   }
    function PDF1(e){
      e.preventDefault()
      var doc = new jsPDF();
      var elementHandler = {
        '#ignorePDF': function (element, renderer) {
          return true;
        }
      };
    //   domtoimage.toBlob(document.querySelector(".residence"))
    // .then(function (blob) {
    //     saveAs(blob, 'my-node.png');
    //     doc.addImage('my-node.png', 'PNG', 15, 40, 180, 160);
    //     doc.save("datauri.pdf");
    // });
      domtoimage.toPng(document.querySelector(".residence")).then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        console.log(dataUrl)
        var imdata=dataUrl
        doc.addImage(imdata, 'PNG', 15, 40, 180, 160);
        doc.save("datauri.pdf");
        // document.querySelector(".inscription2").innerHTML+=` <img src={dataUrl}/>`
        // document.body.appendChild(img);
    }).catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
   }
    return (
    <Router>
        <div>
          <div class=" navbar container-fluid" style={styl}>
            <div class="logo">
                <i class="fa fa-xing" style={sty} ></i>
                <span class="zion">Service Fokotany</span> 
                
            </div>
            <div class="connection"> 
              {this.state.connect ? (
             <div className="user"> 
             <select> 
              <option> {this.state.username} </option> 
              <option>Parametre</option> 
              <option onClick={(e)=> { 
                      e.preventDefault()
                      document.querySelector(".deconnect").style.display="block"}}>Deconnecter</option> 
             </select> 
              </div>):(<span class="connecter" onClick={()=>{
                        document.querySelector(".connect").style.display="block"
                        document.querySelector(".connect").style.top="0"
                        document.querySelector(".inscription1").style.display="block"
              }}>connecter</span> )}
            </div>
          </div>

          <input type="color" id="couleur"/>
          <div class="menu2 container" >
             <div class=" row1 " >
                  <div class="  menu" >
                  <h3> Acceuil</h3>
                  </div>
                  <div class="  menu" >
                    <h3 onClick={function(){
                      if(localStorage.getItem("nom")==null){
                        document.querySelector(".connect2").style.display="block"
                        document.querySelector(".connect2").style.top="0"
                        document.querySelector(".inscription3").style.display="block"
                      }else{
                        document.querySelector(".residence").style.display="block"
                        document.querySelector(".residence").style.top="0"
                        document.querySelector(".inscription2").style.display="block"
                        
                      }
                   
                    
                   }}> Fanamarinam-ponenana</h3>
                  </div>
                  <div class="  menu" >
                   <h3> Fifindramonina</h3>
                  </div>
                  <div class=" menu" >
                   <h3> Copie</h3>
                  </div>
              </div>
              <div class=" row1 " >
                  <div class=" menu" >
                   <h3 onClick={function(){
                    document.querySelector(".register").style.display="block"
                     document.querySelector(".register").style.top="0"
                     document.querySelector(".inscription").style.display="block"
                    
                   }}> Fisoratana Anarana</h3>
                  </div>
                  <div class="  menu" >
                    <h3>Administrateur</h3>
                  </div>
                  <div class="  menu" >
                    <h3>Carte</h3>
                  </div>
                   <div class="  menu" >
                    <h3>Contact</h3>
                  </div>
              </div>
          </div>
       
          <div className="register">
              <div class=" inscription">
                <form>
                    <h3>Inscription</h3>
                    <label for="name">Nom</label><br/><input placeholder="Anarana" onChange={this.handleChange} value={this.state.value} name="nom" />
                    <label for="name">Prenom</label><br/><input placeholder="Fanampina anarana" onChange={this.handleChange} value={this.state.value} name="prenom" />
                    <label for="name">Date et Lieu de naissance</label><br/><input placeholder="Date et Lieu de naissance"onChange={this.handleChange} value={this.state.value} name="birthday" />
                    <label for="name">Votre precedent quartier </label><br/><input placeholder="Fokotany nisy anao taloha  " onChange={this.handleChange} value={this.state.value} name="ancquartier" />
                    <label for="name">Votre nouveau quartier </label><br/><input placeholder="Fokotany hisoratanao anarana " onChange={this.handleChange} value={this.state.value} name="nouvquartier" />
                    <label for="name">Adresse</label><br/><input placeholder="Adresse" onChange={this.handleChange} value={this.state.value} name="adresse" />
                    <label for="name">Adresse</label><br/><input placeholder="Adresse" onChange={this.handleChange} value={this.state.value} name="adresse" />
                    <label for="name">Votre photo </label><br/><input ref={(ref) => { this.uploadInput = ref; }} type="file"/>
                    <label for="name">Votre pseudo </label><br/><input placeholder="Entrer votre pseudo " onChange={this.handleChange} value={this.state.value} name="pseudo" />
                    <label for="name">Mot de passe  </label><br/><input placeholder="Mot de passe " type="password" onChange={this.handleChange} value={this.state.value} name="password" />
                    <label for="name">Confirmer mot de passe</label><br/><input placeholder="Confirmer mot de passe " type="password" onChange={this.handleChange} value={this.state.value} name="password_confirm" />
                     <button className=" fermer btn-danger" onClick={this.handleSubmit}>S inscrire</button>
                      <button className=" hiditra btn-danger" onClick={(e)=> { 
                      e.preventDefault()
                      document.querySelector(".register").style.display="none"}}> Retour</button>
                </form>   
              </div>
            </div>
           
            <div className="connect">
              <div class=" inscription1">
                <form>
                    <h3>Connection</h3>
                    <label for="name">Votre pseudo</label><br/><input placeholder="Entrer votre pseudo " onChange={this.handleChange} value={this.state.value} name="pseudo"/>
                     <span className=" text-danger erreuruser "></span><br/>
                    <label for="name">Mot de passe </label><br/><input placeholder="Mot de passe" type="password" onChange={this.handleChange} value={this.state.value} name="password" />
                       <span className=" text-danger erreurpassword "></span><br/>
                     <button className=" fermer btn-danger"onClick={this.handleConnect}>Connecter</button>
                      <button className=" hiditra btn-danger" onClick={(e)=> { 
                      e.preventDefault()
                      document.querySelector(".connect").style.display="none"}}> Hiverina</button>
                </form>   
              </div>
            </div> 
             <div className="connect2">
              <div class=" inscription3">
                <form>
                    <h3>Connection</h3>
                    <label for="name">Votre pseudo</label><br/><input placeholder="Entrer votre pseudo " onChange={this.handleChange} value={this.state.value} name="pseudo"/>
                    <span className=" text-danger erreuruser "></span>
                    <label for="name">Mot de passe </label><br/><input placeholder="Mot de passe" type="password" onChange={this.handleChange} value={this.state.value} name="password" />
                     <span className=" text-danger erreurpassword "></span>
                     <button className=" fermer btn-danger"onClick={this.handleConnectRes}>Connecter</button>
                      <button className=" hiditra btn-danger" onClick={(e)=> { 
                      e.preventDefault()
                      document.querySelector(".connect").style.display="none"}}> Hiverina</button>
                </form>   
              </div>
            </div> 
             <div className="residence">
              <div class=" inscription2">
                <form>
                    <h3>Certificat de residence</h3>
                    <h4>Quartier {this.state.profil.nouvquartier}</h4>
                      <div className="row">
                        <div className=" info col-md-5"><span><strong>Nom: </strong> {this.state.profil.nom} </span> </div>
                      </div>
                      <div className="row">
                        <div className=" info col-md-5"><span><strong>Prenom:</strong>{this.state.profil.prenom}</span></div>
                      </div>
                      <div className="row">
                        <div className=" info col-md-5"><span><strong>Birthday:</strong>{this.state.profil.birthday} </span></div>
                      </div>
                      <div className="row">
                        <div className=" info col-md-5"><span><strong>Adresse:</strong>{this.state.profil.adresse} </span></div>
                      </div>
                      <div className="row">
                        <div className=" info col-md-5"><span><strong>Telephone:</strong> {this.state.profil.telephone} </span></div>
                      </div>
                      <div className="row">
                        <button className="btn btn-success" onClick={PDF1}>Creer pdf</button>
                      </div>
                      <div id="image">
                      
                      </div>
                </form>   
              </div>
            </div> 
             <div className="deconnect">
              <div class=" inscription4">
                <form>
                    <h3>Souhaitez-vous deconnecter vraiment ?</h3>
                     <button className=" fermer btn-danger"onClick={this.handleDeconnect}>Oui</button>
                      <button className=" hiditra btn-danger" onClick={(e)=> { 
                      e.preventDefault()
                      document.querySelector(".deconnect").style.display="none"}}> Non</button>
                </form>   
              </div>
            </div>
            <Route path="/dashboard" component={Dashboard}/>
     
        </div>
    </Router>
       
    );
  }
}
export default App;
