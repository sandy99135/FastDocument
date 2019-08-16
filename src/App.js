import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jsPDF from 'jspdf';
import $ from 'jquery'
import domtoimage from 'dom-to-image';
//import Navbar from "./components/menu";
import "./App.css";

// Check for token to keep user logged in

class App extends Component {
  constructor(){
    super();
    this.state={
      nom:"",
      prenom:"",
      birthday:"",
      profil:""
    }
    this.handleChange= this.handleChange.bind(this)
    this.handleSubmit= this.handleSubmit.bind(this)
  }
  handleChange(e){
  
    this.setState({ [e.target.name]: e.target.value });
    
  }
  handleSubmit(e){
    e.preventDefault()
    this.setState({ profil:{
    nom:this.state.nom,
    prenom:this.state.prenom,
    birthday:this.state.birthday

    }});
    console.log(this.state.profil)
  }
  render() {
    function PDF1(){
      var doc = new jsPDF();
      var elementHandler = {
        '#ignorePDF': function (element, renderer) {
          return true;
        }
      };
      var source = $('.resultat').html();
      
      domtoimage.toPng( $('.resultat'))
    .then(function(dataUrl) {
    console.log(dataUrl);
      //window.open(dataUrl);
      var img = new Image();
      img.src = dataUrl;
      document.getElementById("image").appendChild(img);
    })
    .catch(function(error) {
      console.error('oops, something went wrong!');
    });

        // doc.fromHTML(
        // source,
        // 15,
        // 15,
        // {
        //   'width': 180,'elementHandlers': elementHandler
        // });
  
        // doc.output("datauri");
        // doc.save("datauri.pdf");
      }
  
      // $( document ).ready(function() {
      //   //console.log( "ready!" );
      //   PDF1();
      // });
    return (
       
        
          <div >
          <div className="row">
            <div className=" formulaire col-md-5">
              <form onSubmit={this.handleSubmit}>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Nom</label>
                    <input type="text" class="form-control" id="exampleInputEmail1"  onChange={this.handleChange} value={this.state.value} name="nom" aria-describedby="emailHelp" placeholder="Nom"/>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Prenom</label>
                    <input type="text" class="form-control" id="exampleInputPassword1"  onChange={this.handleChange} value={this.state.value} name="prenom" placeholder="Prenom"/>
                  </div>
                  <div class="form-group">
                  <label for="exampleInputPassword1">Date de Naissance </label>
                  <input type="date" class="form-control" name="birthday"  value={this.state.birthday} onChange={this.handleChange} id="exampleInputPassword1" />
                  </div>
                <button type="submit" class="btn btn-primary">Creer</button>
              </form>
            </div>
            <div className=" residence col-md-5">
                <div className="resultat">
                <center><h2>Certificat de Residence</h2></center>
                <br></br>
                <div >
                  <div className="row">
                    <div className=" info col-md-5"><span><strong>Nom: </strong> {this.state.profil.nom} </span> </div>
                  </div>
                  <div className="row">
                    <div className=" info col-md-5"><span><strong>Prenom:</strong>  {this.state.profil.prenom}</span></div>
                  </div>
                  <div className="row">
                    <div className=" info col-md-5"><span><strong>Birthday:</strong> {this.state.profil.birthday} </span></div>
                  </div>
                  </div>
              </div>
              <div className="row">
                <button className="btn btn-success" onClick={PDF1}>Creer pdf</button>
              </div>
              <div id="image"></div>
            </div>
          </div>
              
            
          </div>
        
    );
  }
}
export default App;
