import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {Redirect, Link} from 'react-router-dom';
import gerb from '../assets/gerb.png'
function Home(props) {
   
    return (
       <div className="background">
           <Container className="loginContainer">
           <p class="kc-logo__text">Региональная государственная информационная система </p>
            <h1 className="kc-logo__title">“Умная земля” Пермский край</h1>
            <div id="kc-content">
                <Row className="justify-content-md-center top-row">
                    <Link to ="/map/58.001501656.3380666" className="linkInvis" >
                        <Button variant="outline-light" size="lg">Перейти к карте</Button>
                    </Link>
                    
                </Row>
                <Row className="justify-content-md-center">
                <Link to="/issues" className="linkInvis">
                    <div className="counter">
                        {props.issuesCount}
                    </div>
                    <Button variant="outline-light" size="lg">Просмотр нарушений</Button>
                </Link>
                    
                </Row>                          
            </div>
           </Container>
       </div>
    );
}

export default Home;