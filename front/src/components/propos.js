import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch,Link } from "react-router-dom";
import "./dashboard.css"
import axios from "axios"
import "./admin.css";
class Propos extends Component {
	constructor(){
		super()
		this.state={
			habitant:[],
			search:"",
			nom:"",
			password:"",
			quartier:""
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
		axios.get("http://localhost:8080/user").then(user=>{
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
    	quartier:"Ambatomaro",
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
     	if(admin[i].nom==this.state.nom && admin[i].quartier==this.state.quartier && admin[i].password==this.state.password){
     		tab.push(admin[i])
     	}
     	
     }
     if(tab.length>0){
     	localStorage.setItem("admin",this.state.quartier)
     	document.querySelector(".admin").style.display="none"
     }
     else{
     	 alert("misy tsy mety")
     }

 
  }
	render(){
		return(
		<Router>
			<div id="page-content-wrapper">

				<h2>Ambatomaro</h2>

				<h2>Effectif:{this.state.habitant.filter(quatier=>quatier.nouvquartier===localStorage.getItem("admin")).length}habitants</h2>
				<h2>Les responsables</h2>
			     
		   </div>
		</Router>
					
			

		)
	}
}
export default Propos 