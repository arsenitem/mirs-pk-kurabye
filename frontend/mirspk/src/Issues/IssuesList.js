import React, { useState } from 'react';
import { Container, Row, Col, Button, Pagination, Tabs, Tab } from 'react-bootstrap';
import {Redirect, Link} from 'react-router-dom';
import gerb from '../assets/gerb.png'
function IssuesList() {
    let issues = [
        {id: "ed37dde2-a035-4c3c-bed0-ee3a07bc013c", status:"Неопределено", area: "1218501.89702", coordinates: "497743.67030000035,6222063.467800001"},
        {id: "d292b76a-80a9-40ec-8c31-8c99330b557d", status:"Заросло", area: "12112", coordinates: "498200.9782999996,6223683.236500001"},
        {id: "5c019532-203a-4fcc-9c76-ab0ea107ea88", status:"Неопределено", area: "48871.515235", coordinates: "97023.86319999956,6225014.9703"},
        {id: "2362b396-1edd-4121-9cd8-51324b69e8f9", status:"Изменение границ", area: "1812.52826901", coordinates: "504767.1607999997,6227221.115599999"},
        {id: "cfd33e67-f134-441d-8411-cdc76f36a6ce", status:"Изменение границ", area: "24349.0627063", coordinates: "499100.92459999956,6227532.6269000005"},
        {id: "0a1e9af2-4eae-4bb3-9f93-611b8d841e2e", status:"Изменение границ", area: "762201.430006", coordinates: "506181.76049999986,6227357.8594"},
        {id: "c033f166-e92b-4f11-9652-bbaf488339e9", status:"Неопределено", area: "316.721878133", coordinates: "497743.67030000035,6222063.467800001"},
        {id: "c980125e-e8f8-4c53-82d5-ba7192ea1864", status:"Неопределено", area: "3.36527573464", coordinates: "497743.67030000035,6222063.467800001"},
    ]
    let [active, setActive] = useState(1);
    let items = [];
    for (let number = 1; number <= 8; number++) {
    items.push(
        <Pagination.Item key={number} active={number === active} onClick={() =>{nextPage(number)}}>
        {number}
        </Pagination.Item>,
    );
    }
    function nextPage(num) {
        setActive(num)
    }
    const paginationBasic = (
    <div>
        <Pagination>{items}</Pagination>
        <br />
    </div>
    );
    let [issuesCount, setIssuesCount] = useState(8);
    return (
       <div className="background">
           <Container className="loginContainerWide">          
               <Row className="justify-content-md-center">
               {paginationBasic}
               </Row>
               <Row>
                   <Col md={4} className="layerInfo">
                        Номер участка: {issues[active-1].id}
                        <hr/>
                        Статус: {issues[active-1].status}
                        <hr/>
                        Площадь изменений: {issues[active-1].area}
                        <hr/>
                        Координаты: {issues[active-1].coordinates}
                        <hr/>
                        <Button variant="outline-light" onClick={()=> window.open(`http://localhost:3000/map/${issues[active-1].coordinates}`, "_blank")}>Перейти к объекту на карте</Button>
                   </Col>
                   <Col>
                   <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                        <Tab eventKey="home" title="Ручной анализ">
                            <iframe className="frame" src="http://localhost:3000/sbsmap"/>
                        </Tab>
                        <Tab eventKey="profile" title="Спектральный анализ">
                            <iframe className="frame" src="https://rgis.permkrai.ru/map/#/maps/7ac23223-ce0c-48a7-a030-9990bc0307fc?lat=58.635505534704784&lng=56.43127441406251&zoom=10"width="512" height="110"/>
                        </Tab>
                        <Tab eventKey="contact" title="Карта" disabled>
                            <iframe className="frame" src="https://rgis.permkrai.ru/map/#/maps/7ac23223-ce0c-48a7-a030-9990bc0307fc?lat=58.635505534704784&lng=56.43127441406251&zoom=10"width="512" height="110"/>
                        </Tab>
                    </Tabs>
                    
                   </Col>
               </Row>
                <Row>
                  
                </Row>
                <Row className="buttonRow">
                    <Button variant="success" size="lg">Подтвердить</Button>
                    <Button variant="danger" size="lg">Отклонить</Button>
                    <Button variant="dark" size="lg">Забраковать</Button>
                </Row>
           </Container>
       </div>
    );
}

export default IssuesList;