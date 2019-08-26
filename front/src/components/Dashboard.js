import React, { Component } from "react";
import "./dashboard.css"
import axios from "axios"
class Dashboard extends Component {
	constructor(){
		super()
		this.state={
			habitant:[],
			search:""
		}
		this.searchChange= this.searchChange.bind(this)
	}
	searchChange(e){
		this.setState({search:e.target.value})
	}
	componentDidMount(){
		axios.get("http://localhost:8080/user").then(user=>{
			console.log(user.data)
			this.setState({habitant:user.data})
		})
	}
	render(){
		return(
			<div class="d-flex" id="wrapper">
			    
			    <div class="bg-light border-right" id="sidebar-wrapper">
			      <div class="sidebar-heading">Administrateur</div>
			      <div class="list-group list-group-flush">
			        <a href="#" class="list-group-item list-group-item-action bg-light">Dashboard</a>
			        <a href="#" class="list-group-item list-group-item-action bg-light">Shortcuts</a>
			        <a href="#" class="list-group-item list-group-item-action bg-light">Overview</a>
			        <a href="#" class="list-group-item list-group-item-action bg-light">Events</a>
			        <a href="#" class="list-group-item list-group-item-action bg-light">Profile</a>
			        <a href="#" class="list-group-item list-group-item-action bg-light">Status</a>
			      </div>
			    </div>
			   
			    <div id="page-content-wrapper">

			      <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
			       <h3>Liste des habitants</h3>

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
					  {this.state.habitant.length > 0 ? (this.state.habitant.filter(search=>search.nom.toLowerCase().indexOf(this.state.search.toLowerCase())!==-1||
					  	search.prenom.toLowerCase().indexOf(this.state.search.toLowerCase())!==-1 || 
					  	search.adresse.toLowerCase().indexOf(this.state.search.toLowerCase())!==-1).map(user=>{
					  	return(
					  			<tr>
							      <th scope="row">{user._id}</th>
							      <td>Photo</td>
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

		)
	}
}
export default Dashboard
