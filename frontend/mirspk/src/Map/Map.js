import React, { useState, useEffect } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { withRouter } from 'react-router-dom';
import MapButton from './MapButton';
import LayersList from './LayersList'
import ModalGif from './ModalGif'
import AlertDismissible from '../Common/Alert'
import { Modal, FormLabel, Form, Row, Col, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";    
// import DatePicker from "react-bootstrap-date-picker";
var sideBySide = require('leaflet-side-by-side')
var Proj = require('proj4leaflet')
function LeafletMap(props) {
   
    let [lat, setLat] = useState(58);
    let [lng, setLng] = useState(58);
    const [showModal, setShow] = useState(false);
    let map = null;
    let sbsActive = false;
    let sbs = null;
    let crs = new window.L.Proj.CRS('EPSG:3857',
    '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs',
    {
        resolutions: [
        8192, 4096, 2048, 1024, 512, 256, 128
        ],
        origin: [0, 0]
    })
    function mapReady(e) {     
        map = e.target;
        window.leafletMap = map;
        // props.data.features.forEach(element => {
        //      var polygon = window.L.polygon(window.L.Projection.SphericalMercator.unproject(element.geometry.coordinates), {color: 'red'}).addTo(map);
            
        // });
    }
    function openModal(show) {
        setShow(show);
    }
    function sideBySide() {
        if (sbsActive) {
            sbs.remove()
        } else {
            let layer1 = window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
    
            var myLayer2 = window.L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'",{
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            }).addTo(map)
            
    
            sbs = window.L.control.sideBySide(layer1, myLayer2).addTo(map);
            sbsActive = true;
        }
       
    }
    useEffect(() => {
        let latlng = props.match.params.latlng.split(',');
        setLat(latlng[0])
        setLng(latlng[0])
        setTimeout(() => {
            setShowAlert(true)
        }, 10000);
    });
    let [zoom, setZoom] = useState(13);

   
    let [dataS, setDataS] = useState(new Date())
    let [dataPo, setDataPo] = useState(new Date())
   
    function generateGif() {
        //call api, return gif
    }
    const [showAlert, setShowAlert] = useState(false);
    return (     
       <Map center={[58.0015016,58.0015016]} zoom={zoom} className="map" whenReady={mapReady} >
           <div className="operations">
            <MapButton icon={<i class="fas fa-exchange"></i>} action={sideBySide}></MapButton>
            <MapButton icon={<i class="fas fa-history"></i>} action={() => {openModal(true)}}></MapButton>
            {/* <MapButton></MapButton>
            <MapButton></MapButton> */}
           </div>
           <AlertDismissible show={showAlert} setShow = {setShowAlert}/>
           <LayersList></LayersList>
           <Modal
                size="lg"
                show={showModal}
                onHide={() => setShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Формирование таймлапса
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                        <FormLabel>Начало периода</FormLabel>
                        <DatePicker id="example-datepicker" selected={dataS} onChange={(e) => {setDataS(e)}} />
                            
                        </Col>
                        <Col>
                        <FormLabel>Конец периода</FormLabel>
                    
                        <DatePicker id="example-datepicker" selected={dataPo} onChange={(e) => {setDataPo(e)}} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Label>Источник</Form.Label>
                            <Form.Control as="select" custom>
                            <option>Sentinel-2</option>
                            <option>Landsat-8</option>
                            <option>WorldView-4</option>
                            </Form.Control>   
                        </Col>

                    </Row>
                    <Row className="buttonRow">
                        <Col>
                        <Button variant="outline-success" size="lg" onClick={generateGif}>Сгенерировать</Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
            
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'"
          attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        />
      </Map>
    );
}

export default withRouter(LeafletMap);