import React, { Component } from "react";
  import "./photo.css";
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
    this.handleSubmit= this.handleSubmit.bind(this)
  }
    handleChange(e){
  
    this.setState({ [e.target.name]: e.target.value });
    
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
        localStorage.setItem("_id",res.data._id)
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
                    <label for="name">Nom</label><br/><input placeholder="Anarana" onChange={this.handleChange} value={this.state.value} name="nom" />
                    <label for="name">Prenom</label><br/><input placeholder="Fanampina anarana" onChange={this.handleChange} value={this.state.value} name="prenom" />
                    <label for="name">Date et Lieu de naissance</label><br/><input type="date"placeholder="Date et Lieu de naissance"onChange={this.handleChange} value={this.state.value} name="birthday" /><input placeholder=" Lieu de naissance"onChange={this.handleChange} value={this.state.value} name="lieu" />
                    <label for="name">Votre precedent quartier </label><br/><input placeholder="Fokotany nisy anao taloha  " onChange={this.handleChange} value={this.state.value} name="ancquartier" />
                    <label for="name">Votre nouveau quartier </label><br/><input placeholder="Fokotany hisoratanao anarana " onChange={this.handleChange} value={this.state.value} name="nouvquartier" />
                    <label for="name">Adresse</label><br/><input placeholder="Adresse" onChange={this.handleChange} value={this.state.value} name="adresse" />
                    <label for="name">Votre numero telephone</label><br/><input placeholder="numero telephone" onChange={this.handleChange} value={this.state.value} name="telephone" type="number"/>
                    <label for="name">Votre pseudo </label><br/><input placeholder="Entrer votre pseudo " onChange={this.handleChange} value={this.state.value} name="pseudo" />
                    <label for="name">Mot de passe  </label><br/><input placeholder="Mot de passe " type="password" onChange={this.handleChange} value={this.state.value} name="password" />
                    <label for="name">Confirmer mot de passe</label><br/><input placeholder="Confirmer mot de passe " type="password" onChange={this.handleChange} value={this.state.value} name="password_confirm" /><br/>
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