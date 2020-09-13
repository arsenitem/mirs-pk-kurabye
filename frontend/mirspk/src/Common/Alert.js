import React, {useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom';
function AlertDismissible(props) {
    
    return (
      <>    
        <Alert show={props.show} variant="danger" className="alert" dismissible onClose={() => props.setShow(false)}>
          <Alert.Heading>Внимание</Alert.Heading>
          <p>
           Найдены новые нарушения на земельных участках в вашей области, возможно заростание древесными породами
          </p>
          <hr />
          <div className="d-flex justify-content-end">      
          <Link to="/issues" className="linkInvis">
          <Button onClick={() => props.setShow(false)} variant="outline-danger">
                Подробнее
          </Button>
            </Link> 
                  
          </div>
        </Alert>
      </>
    );
  }
  
export default AlertDismissible;