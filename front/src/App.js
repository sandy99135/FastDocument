import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jsPDF from 'jspdf';
import $ from 'jquery'
import domtoimage from 'dom-to-image';
import axios from "axios"
import "./App.css";
import "./acceuil.css";
import "./login.css";
import "./photo.css";
import "./deconnect.css";
import "./residence.css";
import  "dom-to-image/dist/dom-to-image.min.js"
import { saveAs } from 'file-saver'
import Photo from "./photo"
import Residence from "./residence"
import Register from "./register"
import Dashboard from "./components/Dashboard"
import MapContainer from "./components/map"
// import "./font-awesome.min.css"

// Check for token to keep user logged in

class App extends Component {
  constructor(){
    super()
    this.state={
      switch:false,
      connect:false,
      pseudo:"",
      password:"",
      username:"",
      profil:[],
      src:""
    }
    
    this.handleChange= this.handleChange.bind(this)
     this.handleConnect= this.handleConnect.bind(this)
    this.handleConnectRes= this.handleConnectRes.bind(this)
     this.handleDeconnect= this.handleDeconnect.bind(this)
  }
  handleChange(e){
  
    this.setState({ [e.target.name]: e.target.value });
    
  }
 
  handleConnect(e){
    e.preventDefault()
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
  componentDidMount(){
    axios.get("http://localhost:8080/user/"+localStorage.getItem("id")).then(res=>{
      this.setState({profil:res.data})
       this.setState({username:res.data.nom})
      this.setState({connect: localStorage.getItem("connect")})
       console.log(this.state.connect)
    })
  }

   handleConnectRes(e){
    e.preventDefault()
    const individu= {
                    pseudo: this.state.pseudo,
                    password: this.state.password
                }
    axios.post("http://localhost:8080/login",individu).
    then(res=>{
      console.log(res.data)
       if(res.data=='User not found'){
        document.querySelector(".erreuruser2").innerHTML="utilisateur introuvable"  
         }
      else if(res.data!=='User not found'&& res.data=='Incorrect Password'){
        document.querySelector(".erreuruser2").innerHTML="" 
        document.querySelector(".erreurpassword2").innerHTML="mot de passe incorrect"  
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
    document.querySelector(".connect2").style.display="none"
      }
   
    
    })
   
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
              <option> {localStorage.getItem("nom")} </option> 
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
                    <h3>Carte</h3>
                  </div>
                   <div class="  menu" >
                    <h3>Contact</h3>
                  </div>
              </div>
          </div>
          <Register/>
          <div className="connect">
              <div class=" inscription1">
                <form>
                    <h3>Connection</h3>
                    <label for="name">Votre pseudo</label><br/><input placeholder="Entrer votre pseudo " onChange={this.handleChange} value={this.state.value} name="pseudo"/><br/>
                    <span className=" text-danger erreuruser "></span><br/>
                    <label for="name">Mot de passe </label><br/><input placeholder="Mot de passe" type="password" onChange={this.handleChange} value={this.state.value} name="password" /><br/>
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
                    <label for="name">Votre pseudo</label><br/><input placeholder="Entrer votre pseudo " onChange={this.handleChange} value={this.state.value} name="pseudo"/><br/>
                    <span className=" text-danger erreuruser2"></span><br/>
                    <label for="name">Mot de passe </label><br/><input placeholder="Mot de passe" type="password" onChange={this.handleChange} value={this.state.value} name="password" /><br/>
                     <span className=" text-danger erreurpassword2 "></span><br/>
                     <button className=" fermer btn-danger"onClick={this.handleConnectRes}>Connecter</button>
                      <button className=" hiditra btn-danger" onClick={(e)=> { 
                      e.preventDefault()
                      document.querySelector(".connect2").style.display="none"}}> Hiverina</button>
                </form>   
              </div>
            </div> 
            <Residence/>
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
            <Photo /> 
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/map" component={MapContainer}/>
      </div>
    </Router>
       
    );
  }
}
export default App;
