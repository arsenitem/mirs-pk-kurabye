import React, { useState, useEffect } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { withRouter } from 'react-router-dom';
import MapButton from './MapButton';
import LayersList from './LayersList'
import ModalGif from './ModalGif'
import { Modal, FormLabel, Form, Row, Col, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";    
// import DatePicker from "react-bootstrap-date-picker";
var sideBySide = require('leaflet-side-by-side')

function LeafletMap(props) {
   
    let [lat, setLat] = useState(58);
    let [lng, setLng] = useState(58);
    const [showModal, setShow] = useState(false);
    let map = null;
    let sbsActive = false;
    let sbs = null;
    function mapReady(e) {     
        map = e.target;
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
    });
    let [zoom, setZoom] = useState(13);

    function getInitialState (){
        var value = new Date().toISOString();
        return {
          value: value
        }
    };
    function handleChange(value, formattedValue) {
        this.setState({
          value: value, // ISO String, ex: "2016-11-19T12:00:00.000Z"
          formattedValue: formattedValue // Formatted String, ex: "11/19/2016"
        });
    };
    let [dataS, setDataS] = useState(new Date())
    let [dataPo, setDataPo] = useState(new Date())
    function componentDidUpdate(){
        // Access ISO String and formatted values from the DOM.
        var hiddenInputElement = document.getElementById("example-datepicker");
        console.log(hiddenInputElement.value); // ISO String, ex: "2016-11-19T12:00:00.000Z"
        console.log(hiddenInputElement.getAttribute('data-formattedvalue')) // Formatted String, ex: "11/19/2016"
    };
    function generateGif() {
        //call api, return gif
    }
    return (     
       <Map center={[58.0015016,58.0015016]} zoom={zoom} className="map" whenReady={mapReady}>
           <div className="operations">
            <MapButton icon={<i class="fas fa-exchange"></i>} action={sideBySide}></MapButton>
            <MapButton icon={<i class="fas fa-history"></i>} action={() => {openModal(true)}}></MapButton>
            {/* <MapButton></MapButton>
            <MapButton></MapButton> */}
           </div>
            
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