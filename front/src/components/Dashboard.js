import React, { Component } from "react";
import "./dashboard.css"
import axios from "axios"
import "./admin.css";
class Dashboard extends Component {
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
		<div>
			 <div className="admin">
              <div class=" inscription1">
                <form>
                    <h3>Connection</h3>
                    <label for="name">Votre Nom</label><br/><input placeholder="Entrer votre pseudo " onChange={this.handleChange} value={this.state.value} name="nom"/>
                     <span className=" text-danger erreuruser "></span><br/>
                    <label for="name">Votre quartier</label><br/><input placeholder="Entrer votre quartier " onChange={this.handleChange} value={this.state.value} name="quartier"/>
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
			        <a href="#" class="list-group-item list-group-item-action bg-light">List des habitants</a>
			        <a href="#" class="list-group-item list-group-item-action bg-light">A propos</a>
			        <a href="#" class="list-group-item list-group-item-action bg-light">Overview</a>
							<a href="#" onClick={()=>{
								localStorage.removeItem("admin")
								document.querySelector(".admin").style.display="block"

						}} class="list-group-item list-group-item-action bg-light">Deconnexion</a>
			      </div>
			    </div>
			   
			    <div id="page-content-wrapper">

			      <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">


			        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			          <span class="navbar-toggler-icon"></span>
			        </button>

			        <div class="collapse navbar-collapse" id="navbarSupportedContent">
			          <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
			            <li class="nav-item active">
			              <input type="search" value={this.state.search} onChange={this.searchChange}/>
			            </li>
			            <li class="nav-item">
			             <input type="submit" value="Chercher"/>
			            </li>
			          </ul>
			        </div>
			      </nav>

			      <div class="container-fluid">
			        <table class="table">
					  <thead>
					    <tr>
					      <th scope="col">Id</th>
					      <th scope="col">Photo</th>
					      <th scope="col">Nom</th>
					      <th scope="col">Prenom</th>
					      <th scope="col">adresse </th>
					      <th scope="col">Numero telephone</th>
					    </tr>
					  </thead>
					  <tbody>
					  {this.state.habitant.length > 0 ? (this.state.habitant.filter(quatier=>quatier.nouvquartier===localStorage.getItem("admin")).filter(search=>search.nom.toLowerCase().indexOf(this.state.search.toLowerCase())!==-1||
					  	search.prenom.toLowerCase().indexOf(this.state.search.toLowerCase())!==-1 || 
					  	search.adresse.toLowerCase().indexOf(this.state.search.toLowerCase())!==-1).map(user=>{
					  		
					  	return(
					  			<tr>
							      <th scope="row">{user._id}</th>Ambomirary
							      <td><img width="100"src={user.image}/></td>
							      <td>{user.nom}</td>
							      <td>{user.prenom}</td>
							      <td>{user.adresse}</td>
							      <td>{user.telephone}</td>
					    		</tr>
					  		)

					  })) 

					  	:""}
					    
					  </tbody>
					</table>
			      </div>
			    </div>
			    

  </div>

		</div>
			

		)
	}
}
export default Dashboard
