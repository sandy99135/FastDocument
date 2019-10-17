import React, { Component } from "react";
import "./photo.css";
import "./acceuil.css";
import axios from "axios"
  class Register extends Component {
    constructor(){
    super()
    this.state={
      switch:false,
      connect:false,
      username:"",
      pseudo:"",
      nom:"",
      prenom:"",
      birthday:"",
      lieu:"",
      metier:"",
      sex:"",
      ancquartier:"",
      nouvquartier:"",
      adresse:"",
      telephone:"",
      password:"",
      password_confirm:"",
      profil:[],
      src:""
    }
    this.handleChange= this.handleChange.bind(this)
    this.handleChange1= this.handleChange1.bind(this)
    this.handleChangeQuartier1=this.handleChangeQuartier1.bind(this)
    this.handleChangeQuartier2=this.handleChangeQuartier2.bind(this)
    this.handleChangemetier=this.handleChangemetier.bind(this)
    this.handleSubmit= this.handleSubmit.bind(this)
  }
    handleChange(e){
    this.setState({ [e.target.name]: e.target.value }); 
  }
   handleChange1(e){
    e.preventDefault()
    this.setState({lieu:document.getElementById('lieu').options[document.getElementById('lieu').selectedIndex].innerHTML});
    console.log(this.state.lieu)
    
  }
  handleChangeQuartier1(e){
    e.preventDefault()
    this.setState({ancquartier:document.getElementById('ancquartier').options[document.getElementById('ancquartier').selectedIndex].innerHTML});
  }
   handleChangeQuartier2(e){
    e.preventDefault()
    this.setState({nouvquartier:document.getElementById('nouvquartier').options[document.getElementById('nouvquartier').selectedIndex].innerHTML});
    
  }
   handleChangemetier(e){
    e.preventDefault()
    this.setState({metier:document.getElementById('metier').options[document.getElementById('metier').selectedIndex].innerHTML});
    
  }
  componentDidMount(){
    axios.get("http://localhost:8080/user/"+localStorage.getItem("id")).then(res=>{
      this.setState({profil:res.data})
       this.setState({username:res.data.nom})
      this.setState({connect: localStorage.getItem("connect")})
       console.log(this.state.connect)
    })
  }
  handleSubmit(e){
    e.preventDefault()
   const data = new FormData();
    data.append('nom', this.state.nom);
    data.append('prenom', this.state.prenom);
    data.append('password_confirm', this.state.password_confirm);
    data.append('birthday', this.state.birthday);
    data.append('lieu', this.state.lieu);
    data.append('metier', this.state.metier);
    data.append('sex', this.state.sex);
    data.append('ancquartier', this.state.ancquartier);
    data.append('nouvquartier', this.state. nouvquartier);
    data.append('adresse', this.state.adresse);
    data.append('telephone', this.state.telephone);
    data.append('password', this.state.password);
    data.append('pseudo', this.state.pseudo);

     axios.post("http://localhost:8080/register",data).
    then(res=>{
      console.log(res.data)
      if(res.data=='pseudo non disponible essayer un autre' ){
        document.getElementById("ereur").innerHTML="nom d' utilisateur non disponible essayer un autre"
      }
       else if( res.data.password_confirm =='Password and Confirm Password must match'){
        document.getElementById("ereur").innerHTML="les 2mots de passes ne sont pas identiques"
      }
      else{
        localStorage.setItem("id",res.data._id)
        localStorage.setItem("image",res.data.image)
        document.querySelector(".register").style.display="none"
        document.querySelector(".photo").style.display="block"
        document.querySelector(".photo").style.top="0"
        document.querySelector(".inscription5").style.display="block"
       
      }
     
    })
   
  }
  render() {
    
    return(
          <div className="register">
              <div class=" inscription">
                <form>
                    <h3>Inscription</h3>
                    <label for="name">Nom</label><br/>
                    <input placeholder="Anarana" onChange={this.handleChange} value={this.state.value} name="nom" required/>
                    <label for="name">Prenom</label><br/>
                    <input placeholder="Fanampina anarana" onChange={this.handleChange} value={this.state.value} name="prenom" required/>
                    <label for="name">Date et Lieu de naissance</label><br/>
                    <div class="anniveraire">
                      <input id="birthday" type="date"placeholder="Date de naissance"onChange={this.handleChange} value={this.state.value} name="birthday"required/>
                      <select id="lieu" onChange={this.handleChange1} value={this.state.lieu} >
                        <option>Selectionnez votre lieu de naissance</option> 
                        <option>Ambatomaro</option> 
                        <option>Ambohimirary</option>
                        <option>Ambohimahitsy</option>
                    </select>
                    </div>
                    <label for="name">Sexe </label><br/>
                    <label for="name"> <input  className="sex"type="radio" onChange={this.handleChange} value="homme"name="sex"/>homme</label>
                    <label for="name"> <input className="sex" type="radio" onChange={this.handleChange} value="femme"name="sex"/>femme</label><br/>
                    <label for="name">Votre metier </label><br/>
                    <select id="metier" onChange={this.handleChangemetier} value={this.state.meier}>
                        <option>Selectionnez votre metier</option> 
                        <option>Cultivateur</option> 
                        <option>Marchand</option>
                        <option>Docteur</option>
                        <option>Etudiant</option>
                    </select><br/>
                    <label for="name">Votre precedent quartier </label><br/>
                    <select id="ancquartier" onChange={this.handleChangeQuartier1} value={this.state.ancquartier}>
                        <option>Selectionnez votre Ancien quartier</option> 
                        <option>Ambatomaro</option> 
                        <option>Ambohimirary</option>
                        <option>Ambohimahitsy</option>
                    </select><br/>  
                    <label for="name">Votre nouveau quartier </label><br/>
                    <select id="nouvquartier" onChange={this.handleChangeQuartier2} value={this.state.nouvquartier}>
                        <option>Selectionnez votre nouveau quartier</option> 
                        <option>Ambatomaro</option> 
                        <option>Ambohimirary</option>
                        <option>Ambohimahitsy</option>
                    </select><br/> 
                    <label for="name">Adresse</label><br/>
                    <input placeholder="Adresse" onChange={this.handleChange} value={this.state.value} name="adresse" />
                    <label for="name">Votre numero telephone</label><br/>
                    <input placeholder="numero telephone" onChange={this.handleChange} value={this.state.value} name="telephone" type="number" required/>
                    <label for="name">Votre pseudo </label><br/>
                    <input placeholder="Entrer votre pseudo " onChange={this.handleChange} value={this.state.value} name="pseudo" required/>
                    <label for="name">Mot de passe  </label><br/>
                    <input placeholder="Mot de passe " type="password" onChange={this.handleChange} value={this.state.value} name="password" required/>
                    <label for="name">Confirmer mot de passe</label><br/>
                    <input placeholder="Confirmer mot de passe " type="password" onChange={this.handleChange} value={this.state.value} name="password_confirm" required/><br/>
                    <span className="text-danger"id="ereur"></span>
                    <button className=" fermer btn-danger" onClick={this.handleSubmit}>S inscrire</button>
                    <button className=" hiditra btn-danger" onClick={(e)=> { 
                      e.preventDefault()
                      document.querySelector(".register").style.display="none"}}> Retour</button>
                </form>   
              </div>
            </div>

      )
  }
}
export default Register