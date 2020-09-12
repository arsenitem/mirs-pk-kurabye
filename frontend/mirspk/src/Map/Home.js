import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {Redirect, Link} from 'react-router-dom';
import gerb from '../assets/gerb.png'
function Home() {
    return (
       <div className="background">
           <Container className="loginContainer">
           <p class="kc-logo__text">Региональная государственная информационная система </p>
            <h1 className="kc-logo__title">“Умная земля” Пермский край</h1>
            <div id="kc-content">
                <Row className="justify-content-md-center top-row">
                    <Link to ="/map?lat=58.0015016&lng=56.3380666" className="linkInvis" >
                        <Button variant="outline-secondary" size="lg">Перейти к карте</Button>
                    </Link>
                    
                </Row>
                <Row className="justify-content-md-center">
                <Link to="/issues" className="linkInvis">
                    <Button variant="outline-secondary" size="lg">Просмотр нарушений</Button>
                </Link>
                    
                </Row>                          
            </div>
           </Container>
       </div>
    );
}

export default Home;