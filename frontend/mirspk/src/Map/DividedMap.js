import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {Redirect, Link} from 'react-router-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import gerb from '../assets/gerb.png'
function DividedMap() {
    let map = null;
    function mapReady(e) {     
        map = e.target;
        let layer1 = window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        var myLayer2 = window.L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'",{
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        }).addTo(map)
        

        window.L.control.sideBySide(layer1, myLayer2).addTo(map);
    }
  
    return (
        <Map center={[58.0015016,58.0015016]} zoom={13} className="map" whenReady={mapReady} >
      
        </Map>
    );
}

export default DividedMap;