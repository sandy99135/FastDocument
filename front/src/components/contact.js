import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch,Link } from "react-router-dom";
import "./contact.css"
import "dom-to-image/bower_components/fontawesome/css/font-awesome.min.css"
class Contact extends Component {
	constructor(){
		super()
		this.state={
			habitant:[],
			search:"",
			nom:"",
			password:"",
			quartier:"",
			list:true,
			propos:false
		}
		
	}
	render(){
		return(
		<div className="contenu" id="contact">
			<div className="close" >
				<button className="btn btn-secondary" onClick={()=>{window.location="/"}}>Retourner</button> 
            </div>
             <div class="container">
              <h2>Contact Us</h2>
              <p>Feel free to shout us by feeling the contact form or visiting our social network sites like Fackebook,Whatsapp,Twitter.</p>
              <div class="row">
                <div class="col-md-8 col-md-offset-2">
                  <form class="form-horizontal">
                    <div class="form-group">
                      <label for="exampleInputName2">Name</label>
                      <input type="text" class="form-control" id="exampleInputName2" placeholder="Jane Doe"/>
                    </div>
                    <div class="form-group">
                      <label for="exampleInputEmail2">Email</label>
                      <input type="email" class="form-control" id="exampleInputEmail2" placeholder="jane.doe@example.com"/>
                    </div>
                    <div class="form-group ">
                      <label for="exampleInputText">Your Message</label>
                     <textarea  class="form-control" placeholder="Description"></textarea> 
                    </div>
                    <button type="submit" class="btn btn-default">Send Message</button>
                  </form>

                  <hr/>
                    <h3>Our Social Sites</h3>
                	<i class="fa fa-user" aria-hidden="true"></i>
                </div>
              </div>
            </div>
		</div>

		)
	}
}
export default Contact
