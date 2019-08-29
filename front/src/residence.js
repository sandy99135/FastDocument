import React, { Component } from "react";
import "./residence.css";
import axios from "axios"
import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import  "dom-to-image/dist/dom-to-image.min.js"
import StripeCheckout from 'react-stripe-checkout'
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
    const publishableKey = "pk_test_gAynoqTSBUs0tJHDk2ZWaR5P00VWwnB5jm";
    const onToken = token => {
      const body = {
        amount: 999,
        token: token
    };  axios
        .post("http://localhost:8000/", body)
        .then(response => {
          console.log(response);
          alert("Payment Success");
        })
        .catch(error => {
          console.log("Payment Error: ", error);
          alert("Payment Error");
        });
    };
      function PDF1(e){
      e.preventDefault()
 

      var doc = new jsPDF();
      var elementHandler = {
        '#ignorePDF': function (element, renderer) {
          return true;
        }
      };
      domtoimage.toPng(document.querySelector(".inscription2")).then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        console.log(dataUrl)
        var imdata=dataUrl
        doc.addImage(imdata, 'PNG', 15, 40, 180, 160);
        doc.save("datauri.pdf");
        document.querySelector(".succes").style.display="flex"
        document.querySelector(".residence").style.display="none"


        // document.querySelector(".inscription2").innerHTML+=` <img src={dataUrl}/>`
        // document.body.appendChild(img);
    }).catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
   }
    return(
          <div className="residence">
              <div class=" inscription2">
                  <center>
                  <h5>Republique Democratique de Madagascar</h5>
                  <hr/>
                  <h5>Province Antananarivo</h5>
                  <hr/>
                  <h5>Deuxieme Arrondissement</h5>
                  <hr/>
                  <h5>Quartier {this.state.profil.nouvquartier}</h5>
                  <hr/>
                  <h4>Certificat de residence</h4>
                  </center>
                      <div className="row">
                        <div className=" info "><span><strong>Nom: </strong> .............................{this.state.profil.nom} </span> </div>
                      </div>
                      <div className="row">
                        <div className=" info "><span><strong>Prenom:</strong>.........................{this.state.profil.prenom}</span></div>
                      </div>
                      <div className="row">
                        <div className=" info "><span><strong>Birthday:</strong>........................{this.state.profil.birthday} </span></div>
                      </div>
                      <div className="row">
                        <div className=" info "><span><strong>Adresse:</strong>..........................{this.state.profil.adresse} </span></div>
                      </div>
                      <div id='dernier'className="row">
                        <div className=" info "><span><strong>Telephone:</strong> ........................{this.state.profil.telephone} </span></div>
                      </div>
              </div>
              <div  id="pdfbouton"className="row">
                        
                        <StripeCheckout
                        label="go to payment" //Component button text
                        name="Business LLC" //Modal Header
                        description="Upgrade to a premium account today."
                        panelLabel="Go Premium" //Submit button in modal
                        amount={999} //Amount in cents $9.99
                        token={onToken}
                        stripeKey={publishableKey}
                        image="https://www.vidhub.co" //Pop-in header image
                        billingAddress={false}
                      />
                      <button onClick={()=>document.querySelector(".residence").style.display="none"}>Annuler</button>
                      <button visibility="hidden" onClick={PDF1}>Creer PDF1</button>
                      </div>
               <div className="succes"> <h2 className="text-success">Creation de PDF reussie</h2></div>
            </div> 

      )
  }
}
export default Residence
            