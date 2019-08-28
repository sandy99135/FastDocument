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
      src:""
    }
     this.upload= this.upload.bind(this)
  }
    componentDidMount(){
      axios.get("http://localhost:8080/user/"+localStorage.getItem("_id")).then(res=>{
      this.setState({src:res.data.image})
    })
  }
  upload(e){
    e.preventDefault()
   const data = new FormData();
    data.append('image', this.uploadInput.files[0]);
    
     axios.post("http://localhost:8080/photo/"+ localStorage.getItem("_id"),data).
    then(res=>{
      console.log(res.data)
       axios.get("http://localhost:8080/user/"+localStorage.getItem("_id")).then(res=>{
      this.setState({src:res.data.image})
    })
    })
  }
  render() {
     var video = document.getElementById("video");
     console.log( document.getElementById("video"))
      function play(e){
        e.preventDefault()
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
 navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
 video.srcObject = stream;
 video.play();
 });
      }
}
 function clone(e){
  e.preventDefault()
    var canvas1 = document.getElementById('cvs').getContext('2d');
    canvas1.drawImage(video, 0,0, 150, 112);
    var base64=document.getElementById('cvs').toDataURL("image/png"); //l'image au format base 64
    console.log(base64);
     document.getElementById('tar').value='';
    document.getElementById('tar').value=base64;
    const data = new FormData();
    data.append('base', document.getElementById('tar').value);
      axios.post("http://localhost:8080/photocapture/"+ localStorage.getItem("_id"),data).
    then(res=>{
      console.log(res.data)
       axios.get("http://localhost:8080/user/"+localStorage.getItem("_id")).then(res=>{
      this.setState({src:res.data.image})
    })
    })
   
  }

  // window.onload = init;

function stop(e) {
  e.preventDefault()
  var stream = video.srcObject;
  var tracks = stream.getTracks();

  for (var i = 0; i < tracks.length; i++) {
    var track = tracks[i];
    track.stop();
  }

  video.srcObject = null;
}
    return(
          <div className="photo">
                <div class=" inscription5">
                  <h3>Votre photo</h3>
                   <div id="choix">
                  <a onClick={()=>{this.setState({switch:false})}}  class="list-group-item list-group-item-action bg-light">Uploader un fichier</a>
                  <a onClick={()=>{this.setState({switch:true})}} class="list-group-item list-group-item-action bg-light">Prendre une photo</a>
                   </div>
                   {this.state.switch ? (<div id="upload">
                    <div className="apercu">
                      <img width="100"src={this.state.src}/>
                    </div>
                    <form>
                        <label for="name">Uploader votre photo</label><br/><input id="image" ref={(ref) => { this.uploadInput = ref; }}type="file"/>
                        <button className=" fermer btn-danger"onClick={this.upload}>Uploader</button>
                    </form>   
                  </div>):( <div id="capture">
                    <div className="apercu">
                      <video id="video" width="200" height="200" autoplay/>
                      // <canvas id="cvs" height='150' width='150'></canvas>
                    </div>
                    <form>
                      <input type="hidden" id='tar' />
                      <button onClick={play} >play</button>
                      <button onClick={clone} >photo</button>
                      <button onClick={stop} >arreter</button>
                    </form>   
                  </div>)}
                  
                  
               
                </div>
              </div>

      )
  }
}
export default Photo
            