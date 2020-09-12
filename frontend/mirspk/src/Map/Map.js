import React, { useState, useEffect } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { withRouter } from 'react-router-dom';
import MapButton from './MapButton';
import LayersList from './LayersList'

function LeafletMap(props) {
    useEffect(() => {
        
        console.log(props.match.params.latlng)
    });
    console.log(props.match.params.latlng)
    let [zoom, setZoom] = useState(13)
  return (
       <Map center={[58.0015016,58.0015016]} zoom={zoom} className="map">
           <div className="operations">
            <MapButton icon={<i class="fas fa-minus"></i>} action={()=> {setZoom(zoom--)}}></MapButton>
            <MapButton icon={<i class="fas fa-plus"></i>} action={()=> {setZoom(zoom++)}}></MapButton>
            <MapButton></MapButton>
            <MapButton></MapButton>
            <MapButton></MapButton>
            <MapButton></MapButton>
           </div>
           
           <LayersList></LayersList>
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'"
          attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        />
      </Map>
  );
}

export default withRouter(LeafletMap);