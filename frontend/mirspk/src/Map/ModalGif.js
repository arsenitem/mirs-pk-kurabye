import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import plus from '../assets/plus-solid.svg'
import { Modal } from 'react-bootstrap';

const position = [58.0015016,56.3380666]

function ModalGif(props) {
  return (
    <Modal
    size="lg"
    show={props.show}
    onHide={() => props.setShow(false)}
    aria-labelledby="example-modal-sizes-title-lg"
  >
    <Modal.Header closeButton>
      <Modal.Title id="example-modal-sizes-title-lg">
        Large Modal
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>...</Modal.Body>
  </Modal>
  );
}

export default ModalGif;