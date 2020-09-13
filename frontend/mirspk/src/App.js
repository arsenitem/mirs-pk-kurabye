import React, { useEffect,useState } from 'react';
import './App.css';
import { Container, Row, Button } from 'react-bootstrap';
import {Route, BrowserRouter, Redirect} from 'react-router-dom';
import Login from './Login/Login'
import Home from './Map/Home';
import LeafletMap from './Map/Map'
import IssuesList from './Issues/IssuesList';
import DividedMap from './Map/DividedMap';
import EmptyMap from './Map/EmptyMap'
let json = require('./assets/layers.json');

function App() {
  let [issuesCount, setIssuesCount] = useState(8);
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
          <Home issuesCount={issuesCount} setIssuesCount={setIssuesCount}></Home>
        </Route> 
        <Route path="/issues">
          <IssuesList issuesCount={issuesCount} setIssuesCount={setIssuesCount}></IssuesList>
        </Route>
        <Route path="/map/:latlng">
         <LeafletMap data={json}></LeafletMap>
        </Route> 
        <Route path="/sbsmap">
         <DividedMap></DividedMap>
        </Route> 
        <Route path="/emptymap">
         <EmptyMap></EmptyMap>
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
