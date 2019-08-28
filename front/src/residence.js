import React, { Component } from "react";
import "./residence.css";
import axios from "axios"
import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import  "dom-to-image/dist/dom-to-image.min.js"
  class Residence extends Component {
    constructor(){
    super()
    this.state={
      profil:[],
    }
  }
    componentDidMount(){
    axios.get("http://localhost:8080/user/"+localStorage.getItem("id")).then(res=>{
      this.setState({profil:res.data})
       this.setState({username:res.data.nom})
      this.setState({connect: localStorage.getItem("connect")})
       console.log(this.state.connect)
    })
  }

  render() {
      function PDF1(e){
      e.preventDefault()
      var doc = new jsPDF();
      var elementHandler = {
        '#ignorePDF': function (element, renderer) {
          return true;
        }
      };
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
    return(
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

      )
  }
}
export default Residence
            