import React from 'react';
import { Row, Form } from 'react-bootstrap';
import { Map, Marker, Popup, TileLayer} from 'react-leaflet'
const position = [58.0015016,56.3380666]

function LayersList() {
  return (
      <div className="layersList" >
        <Row className="searchLayer">
          
          <Form.Control type="email" placeholder="Поиск слоя" />
        </Row>
      </div>
  );
}

export default LayersList;