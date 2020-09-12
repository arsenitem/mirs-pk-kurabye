import React from 'react';
import './App.css';
import { Container, Row, Button } from 'react-bootstrap';
import {Route, BrowserRouter, Redirect} from 'react-router-dom';
import Login from './Login/Login'
import Home from './Map/Home';
import LeafletMap from './Map/Map'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/login">
          <Login/>
        </Route> 
        <Route path="/home">
          <Home></Home>
        </Route> 
        <Route path="/map/:latlng">
         <LeafletMap></LeafletMap>
        </Route> 
      </BrowserRouter>
     
      {/* <Container>
        <Row className="justify-content-md-center">
          <Button >
            Перейти к карте
          </Button>
        </Row>
        <Row className="justify-content-md-center">
           <Button >
            Просмотр нарушений
          </Button>
        </Row>
      </Container> */}
    </div>
  );
}

export default App;
