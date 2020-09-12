import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import plus from '../assets/plus-solid.svg'

const position = [58.0015016,56.3380666]

function MapButton(props) {
  return (
      <div className="mapButton" onClick={() => {props.action()}}>
        {props.icon}
      </div>
  );
}

export default MapButton;