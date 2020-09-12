import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {Redirect, Link} from 'react-router-dom';
import gerb from '../assets/gerb.png'
function Login() {
    return (
       <div className="background">
           <Container className="loginContainer">
           <p class="kc-logo__text">Региональная государственная информационная система </p>
            <h1 className="kc-logo__title">“Умная земля” Пермский край</h1>
            <div id="kc-content">
                <Row>
                <Col>
                    <Link to ="/home" className="linkInvis">

                    
                        <div className="loginVariant">                  
                        <div className="gerbImage"></div>
                        
                            
                       
                        <span><b>Войти как госслужащий</b> РСАА (Региональный сервис аутентификации и авторизации сотрудников органов власти и учреждений)</span>
                        </div>
                    </Link>
                </Col>
                <Col>
                    <Link to ="/home" className="linkInvis">

               
                        <div className="loginVariant">
                    
                        <div className="userImage"></div>
                        <span><b>Войти как землепользователь</b> РСААГ (Региональный сервис аутентификации и авторизации гражданина Пермского края) / ЕСИА (Единая система идентификации и аутентификации)</span>
                        </div>
                    </Link>
                </Col>
                </Row>
                <Row className="justify-content-md-center footer">
                    <div class="kc-form-footer">
                        <a href="mailto:team@kurabye.ru" class="kc-form-footer__email">team@kurabye.ru</a>
                        <div class="kc-form-footer__copyright">
                            <span id="kc-form-footer__copyrigh-year">2020</span>, Команда Курабье
                        </div>
                        <a href="javascript:void(0);" class="kc-form-footer__link">Администрирование</a>
                    </div>
                </Row>
              
            </div>
           </Container>
       </div>
    );
}

export default Login;