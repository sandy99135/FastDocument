  import React, { Component } from "react";
  import "./photo.css";
  import axios from "axios"
  class Photo extends Component {
    constructor(){
    super()
    this.state={
      switch:true,
      connect:false,
      username:"",
      nom:"",
      prenom:"",
      birthday:"",
      ancquartier:"",
      nouvquartier:"",
      adresse:"",
      telephone:"",
      password:"",
      password_confirm:"",
      profil:[],
      src:localStorage.getItem("image")
    }
      this.handleChange= this.handleChange.bind(this)
     this.handleConnect= this.handleConnect.bind(this)
     this.upload= this.upload.bind(this)
  }
    componentDidMount(){
      
      axios.get("http://localhost:8080/user/"+localStorage.getItem("id")).then(res=>{
      this.setState({src:localStorage.getItem("image")})
    })
  }
handleChange(e){
  
    this.setState({ [e.target.name]: e.target.value });
    
  }
 
  handleConnect(e){
    e.preventDefault()
    const individu= {
                    pseudo: this.state.pseudo,
                    password: this.state.password
                }
    axios.post("http://localhost:8080/login",individu).
    then(res=>{
      console.log(res.data)
       if(res.data=='User not found'){
        document.querySelector(".erreuruser").innerHTML="utilisateur introuvable"  
         }
      else if(res.data!=='User not found'&& res.data=='Incorrect Password'){
        document.querySelector(".erreuruser").innerHTML="" 
        document.querySelector(".erreurpassword").innerHTML="mot de passe incorrect"  
         }
     if(res.data!=='Incorrect Password' && res.data!=='User not found' ){
       document.querySelector(".erreurpassword").innerHTML="" 
    localStorage.setItem("id",res.data.id)
    localStorage.setItem("nom",res.data.nom)
    localStorage.setItem("connect",res.data.success)
    axios.get("http://localhost:8080/user/"+localStorage.getItem("id")).then(res=>{
      this.setState({profil:res.data})
      this.setState({connect: localStorage.getItem("connect")})
      this.setState({username:res.data.nom})
      console.log(this.state.connect)
    })
     this.setState({connect:true})
    document.querySelector(".connect").style.display="none"
      }
   
    
    })
    
  }
  upload(e){
    e.preventDefault()
   const data = new FormData();
    data.append('image', this.uploadInput.files[0]);
    
     axios.post("http://localhost:8080/photo/"+ localStorage.getItem("id"),data).
    then(res=>{
      console.log(res.data)
       axios.get("http://localhost:8080/user/"+localStorage.getItem("id")).then(res=>{
      this.setState({src:res.data.image})
      document.getElementById("Terminer").style.display="block"
    })
    })
  }
  render() {

    return(
        <div>  
           <div className="photo">
                <div class=" inscription5">
                  <h3>Votre photo</h3>
                   <div id="choix">
                  <a onClick={()=>{this.setState({switch:false})}}  class="list-group-item list-group-item-action bg-light">Uploader un fichier</a>
                  <a onClick={()=>{this.setState({switch:true})}} class="list-group-item list-group-item-action bg-light">Prendre une photo</a>
                   </div>
                   {this.state.switch ? (<div id="capture">
                    <div id="camparent"> 
                        <video id="video" className="video"width="200" height="200" autoplay/>
                        <div onClick={(e)=>{
                     e.preventDefault()
                    document.getElementById("camera").style.display="none"
                     let video = document.querySelector(".video");
                     console.log(video   )
                       if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                   navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
                   video.srcObject = stream;
                   video.play();
                   });
                   }}} id="camera">
                           <i class="camera2 fa fa-camera" ></i>
                        </div>
                    </div>
                   
                  <canvas id="cvs" height='200' width='200'></canvas>
               
                 <form>
                   <input type="hidden" id='tar' />
                   <button onClick={(e)=>{
                     e.preventDefault()
                     document.getElementById("cvs").style.zIndex=-1
                     document.querySelector(".photo").style.zIndex=2
                   }}>play</button>
                   <button onClick={(e)=>{
                             e.preventDefault()
                             var video = document.getElementById("video");
                             console.log( document.getElementById("video"))
                               var canvas1 = document.getElementById('cvs').getContext('2d');
                               canvas1.drawImage(video, 0,0, 150, 112);
                               var base64=document.getElementById('cvs').toDataURL("image/png"); //l'image au format base 64
                               console.log(base64);
                               document.getElementById('tar').value='';
                               document.getElementById('tar').value=base64;
                               const data = new FormData();
                               data.append('base', document.getElementById('tar').value);
                                 axios.post("http://localhost:8080/photocapture/"+ localStorage.getItem("id"),data).
                               then(res=>{
                                 console.log(res.data)
                                 axios.get("http://localhost:8080/user/"+localStorage.getItem("id")).then(res=>{
                                 this.setState({src:res.data.image})
                               })
                              
                               })
                             
document.getElementById("cvs").style.zIndex=3
document.querySelector(".photo").style.zIndex=3
                   }
            } >photo</button>
            <button id="Terminer" onClick={(e)=>{
               e.preventDefault()
              document.querySelector(".photo").style.display="none"
              document.querySelector(".connect").style.display="block"
              localStorage.getItem("nom")
            }}>Terminer</button>
                 </form>   
               </div>):
                   ( <div id="upload">
                    <div className="apercu">
                      <img width="200"src={this.state.src}/>
                    </div>
                    <form>
                        <label for="name">Uploader votre photo</label><br/><input id="image" ref={(ref) => { this.uploadInput = ref; }}type="file"/>
                        <button className=" fermer btn-danger"onClick={this.upload}>Uploader</button>
                        <button id="Terminer" onClick={(e)=>{
                          e.preventDefault()
                          document.querySelector(".photo").style.display="none"
                          document.querySelector(".connect").style.display="block"
                        }}>Terminer</button>
                    </form>   
                  </div>)}
                  <div className="connect">
                    <div class=" inscription1">
                      <form>
                          <h3>Connection</h3>
                          <label for="name">Votre pseudo</label><br/><input placeholder="Entrer votre pseudo " onChange={this.handleChange} value={this.state.value} name="pseudo"/><br/>
                          <span className=" text-danger erreuruser "></span><br/>
                          <label for="name">Mot de passe </label><br/><input placeholder="Mot de passe" type="password" onChange={this.handleChange} value={this.state.value} name="password" /><br/>
                          <span className=" text-danger erreurpassword "></span><br/>
                           <button className=" fermer btn-danger"onClick={this.handleConnect}>Connecter</button>
                            <button className=" hiditra btn-danger"  onClick={(e)=>{
                          e.preventDefault()
                          document.querySelector(".photo").style.display="none"
                          document.querySelector(".connect").style.display="block"
                        }}> Hiverina</button>
                      </form>   
                    </div>
                  </div> 
                </div>
              </div>

        </div>
         

      )
  }
}
export default Photo
            