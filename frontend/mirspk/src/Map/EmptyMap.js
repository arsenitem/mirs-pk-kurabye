import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {Redirect, Link} from 'react-router-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import gerb from '../assets/gerb.png'
function DividedMap() {
    return (
        <Map center={[57.9979525,56.5284015]} zoom={13} className="map">
       <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'"
          attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        />
        </Map>
    );
}

export default DividedMap;