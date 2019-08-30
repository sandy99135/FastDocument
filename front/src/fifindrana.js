import React, { Component } from "react";
import "./residence.css";
import "./sandy.css";
import axios from "axios"
import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import  "dom-to-image/dist/dom-to-image.min.js"
// import StripeCheckout from 'react-stripe-checkout'
  class Fifindramonina extends Component {
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
    // const publishableKey = "pk_test_gAynoqTSBUs0tJHDk2ZWaR5P00VWwnB5jm";
    // const onToken = token => {
    //   const body = {
    //     amount: 999,
    //     token: token
    // };  axios
    //     .post("http://localhost:8000/", body)
    //     .then(response => {
    //       console.log(response);
    //       alert("Payment Success");
    //     })
    //     .catch(error => {
    //       console.log("Payment Error: ", error);
    //       alert("Payment Error");
    //     });
    // };
      function PDF1(e){
      e.preventDefault()
 

      var doc = new jsPDF();
      var elementHandler = {
        '#ignorePDF': function (element, renderer) {
          return true;
        }
      };
      domtoimage.toPng(document.querySelector(".block")).then(function (dataUrl) {
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
      <div class="block">

        <div class="float">
            REPUBLIQUE DE MADAGASCAR <br/>
            Tanindrazana-Fahafana-Fandroasoana
        </div>

        <div class="sous-block">

            <div class=""></div>
            <h4 class="h4">FONKONTANY {this.state.profil.nouvquartier}</h4>
            <div class="barre"></div>
            <h2>CERTIFICAT DE RESIDENCE</h2>
            <div class="barre"></div>

            <div class="formulaire">
                Le Chef Fonkontany {this.state.profil.nouvquartier} certifie que : <br/>
                   Le nommé <span>{this.state.profil.nom}</span>  <br/>
                   né a <span>Ambatolampy</span>  <br/> le <span>{this.state.profil.birthday}</span>   <br/>
                   réside en cette cartier depuis <span>10 fev 2017</span> <br/>
                   A l'adress <span> {this.state.profil.adresse }</span> <br/>
                    <span>Ambohimirary</span> ,le <span>28 Aout 2019</span>
            </div>

            <div class="caché">
                <div class="box">
                    <img src="caché.jpeg" alt=""/><br/>
                    Chef fonkontany
                </div>
            </div>

          </div>  
        </div>
        <div className="creer"> 
         <button className="btn-success"onClick={PDF1}>Creer Pdf</button>  
        </div> 
      </div> 

      )
  }
}
export default Fifindramonina