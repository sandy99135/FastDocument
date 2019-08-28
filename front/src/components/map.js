import { Map, GoogleApiWrapper , Marker} from 'google-maps-react';
import React, { Component } from "react";
class MapContainer extends Component {
	render() {
const mapStyles = {
position:"absolute",
  top:0,
  width: '100%',
  height: '100%',
};

    return (
    	<div style={mapStyles}>
           <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 47.444, lng: -122.176}}
        >
          <Marker position={{ lat: 48.00, lng: -122.00}} />
        </Map>          
        </div>
       
    );
  }

}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyChlcvvyzuyG5iHfXkdO7kjSqd-1ZW08jg'
})(MapContainer);
