import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch,Link } from "react-router-dom";
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
import Fifindramonina from "./fifindrana"
import Residence from "./residence"
import Register from "./register"
import Dashboard from "./components/Dashboard"
import Dashboardgrand from "./components/admin"
import MapContainer from "./components/map"
import "dom-to-image/bower_components/fontawesome/css/font-awesome.min.css"

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
    localStorage.setItem("image",res.data.image)
    localStorage.setItem("connect",res.data.success)
    axios.get("http://localhost:8080/user/"+localStorage.getItem("id")).then(res=>{
      this.setState({profil:res.data})
      this.setState({username:res.data.nom})
    })
     this.setState({connect:true})
    document.querySelector(".connect").style.display="none"
      }
   
    
    })
    
  }
  componentDidMount(){
    axios.get("http://localhost:8080/"+localStorage.getItem("id")).then(res=>{
      this.setState({profil:res.data})
      this.setState({username:res.data.nom})
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
    localStorage.setItem("image",res.data.image)
    localStorage.setItem("connect",res.data.success)
    axios.get("http://localhost:8080/"+localStorage.getItem("id")).then(res=>{
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
    width:"100px",
    color:"white"
   }
   let styly={
    color:"white"
   }
   let styl={
    background:"linear-gradient(40deg,#DD2880,#eb2af3)"
   }
   
   console.log("etat",this.state.connect)
    return (
    <Router>
      <div>
          <div class=" navbar container-fluid" style={styl}>
            <div class="logo">
                <img width="100"src="fokotany.png" />
                <span class="zion">Service Fokotany</span> 
                
            </div>
            <div class="connection"> 
              {localStorage.getItem("connect") ? (
             <div className="user"> 
             <img width="50"className="imaguser"src={localStorage.getItem("image")}/>
             <select> 
              <option style={styly}> {localStorage.getItem("nom")} </option> 
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
          <div class="menu2 container" >
             <div class=" row1 " >
                  <div class="  menu" onClick={function(){
                      if(localStorage.getItem("nom")==null){
                        document.querySelector(".connect2").style.display="block"
                        document.querySelector(".connect2").style.top="0"
                        document.querySelector(".inscription3").style.display="block"
                      }else{
                        document.querySelector(".residence").style.display="block"
                        document.querySelector(".residence").style.top="0"
                        document.querySelector(".block").style.display="block"
                        
                      }
                   
                    
                   }} >
                  <i class=" icone fa fa-sticky-note" ></i>
                    <h3 > Residence</h3>
                  </div>
                  <div class="  menu" onClick={function(){
                      if(localStorage.getItem("nom")==null){
                        document.querySelector(".connect2").style.display="block"
                        document.querySelector(".connect2").style.top="0"
                        document.querySelector(".inscription3").style.display="block"
                      }else{
                        document.querySelector(".residence").style.display="block"
                        document.querySelector(".residence").style.top="0"
                        document.querySelector(".block").style.display="block"
                        
                      }
                   
                    
                   }}>
                   <i class=" icone fa fa-map" ></i>
                   <h3 > Fifindramonina</h3>
                  </div>
                  <div class=" menu" onClick={function(){
                     if(localStorage.getItem("nom")==null){
                     document.querySelector(".register").style.display="block"
                     document.querySelector(".register").style.top="0"
                     document.querySelector(".inscription").style.display="block"
                     }
                     else{
                      document.querySelector(".deconnect").style.display="block"
                     }
                   
                    
                   }} >
                  <i class=" icone fa fa-user-plus" ></i>
                   <h3 > Fisoratana Anarana</h3>
                  </div>
              </div>

              <div class=" row1 " >
                  <div class="  menu" onClick={(e)=>window.location="/map"} >
                    <i class=" icone fa fa-globe" style={sty} ></i>
                    <h3>Carte</h3>
                  </div>
                   <div class="  menu" >
                   <i class=" icone fa fa-phone-square" style={sty} ></i>
                    <h3>Contact</h3>
                  </div>
                   <div class="  menu" >
                   <i class=" icone fa fa-user" style={sty} ></i>
                    <h3>Admin</h3>
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
            <Fifindramonina/>
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
            <Route path="/admin" component={Dashboardgrand}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/map" component={MapContainer}/>
      </div>
    </Router>
       
    );
  }
}
export default App;
