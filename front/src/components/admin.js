import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch,Link } from "react-router-dom";
import "./dashboard.css"
import ListTous from "./listtout"
import ListAdmin from "./listadmin"
import Propos from "./propos"
import axios from "axios"
import "./admin.css";
class Dashboardgrand extends Component {
	constructor(){
		super()
		this.state={
			habitant:[],
			search:"",
			nom:"",
			password:"",
			quartier:"",
			list:true,
			propos:false
		}
		this.searchChange= this.searchChange.bind(this)
		this.handleChange= this.handleChange.bind(this)
		this.handleConnect= this.handleConnect.bind(this)
	}
	searchChange(e){
		this.setState({search:e.target.value})
	}
	handleChange(e){
		this.setState({[e.target.name]: e.target.value })
	}
	componentDidMount(){
		axios.get("https://fokotany.herokuapp.com/user").then(user=>{
			console.log(user.data)
			this.setState({habitant:user.data})
		})
		if(localStorage.getItem("admin")!== null){
			document.querySelector(".admin").style.display="none"
		}
	}
	handleConnect(e){
    e.preventDefault()
    console.log("connect")
    const admin= [
    {
    	nom:"RAKOTO",
    	password:"Ambatomaro"
    },
    {
    	nom:"RABE",
    	quartier:"Ambomirary",
    	password:"Ambomirary"
    	
    }
    ] 
		axios.get("http://localhost:8080/user").then(user=>{
			console.log(user.data)
			this.setState({habitant:user.data})
		})
   var tab=[]
     for(let i=0;i<admin.length;i++){
     	if(admin[i].nom==this.state.nom  && admin[i].password==this.state.password){
     		tab.push(admin[i])
     	}
     	
     }
     if(tab.length>0){
     	localStorage.setItem("admin",this.state.nom)
     	document.querySelector(".admin").style.display="none"
     }
     else{
     	 alert("misy tsy mety")
     }

 
  }
	render(){
		return(
		<Router>
			<div>

			 <div className="admin">
              <div class=" inscription1">
                <form>
                    <h3>Connection</h3>
                    <label for="name">Votre Nom</label><br/><input placeholder="Entrer votre pseudo " onChange={this.handleChange} value={this.state.value} name="nom"/>
                     <span className=" text-danger erreuruser "></span><br/>
                    <label for="name">Mot de passe </label><br/><input placeholder="Mot de passe" type="password" onChange={this.handleChange} value={this.state.value} name="password" />
                       <span className=" text-danger erreurpassword "></span><br/>
                     <button className=" fermer btn-danger"onClick={this.handleConnect}>Connecter</button>
                      <button className=" hiditra btn-danger" onClick={(e)=> { 
											e.preventDefault()
											window.location="/"
                      }}> Hiverina</button>
                </form>   
              </div>
            </div> 


			<div class="d-flex" id="wrapper">
			    <div class="bg-light border-right" id="sidebar-wrapper">
			      <div class="sidebar-heading">Fokotany {localStorage.getItem("admin")}</div>
			      <div class="list-group list-group-flush">
			        <Link to="/admin"><a  onClick={()=>{this.setState({list:true})

						}}class="list-group-item list-group-item-action bg-light">List des habitants</a></Link>
			        <Link to="/admin/propos"><a   onClick={()=>{this.setState({list:false})

						}}class="list-group-item list-group-item-action bg-light">Les responsables</a></Link>
							<a href="#" onClick={()=>{
								localStorage.removeItem("admin")
								document.querySelector(".admin").style.display="block"

						}} class="list-group-item list-group-item-action bg-light">Deconnexion</a>
			      </div>
			    </div>
			 {this.state.list ? (<ListTous/>):(<ListAdmin/>)}
  			</div>

  			
		</div>
		</Router>
					
			

		)
	}
}
export default Dashboardgrand