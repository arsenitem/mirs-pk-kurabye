import React, { useState } from 'react';
import { Container, Row, Col, Button, Pagination } from 'react-bootstrap';
import {Redirect, Link} from 'react-router-dom';
import gerb from '../assets/gerb.png'
function IssuesList() {
    let issues = [
        {id: "1", status:"none", area: "21441", coordinates: ""},
        {id: "2", status:"modified", area: "12112", coordinates: ""},
        {id: "", status:"", area: "", coordinates: ""},
        {id: "", status:"", area: "", coordinates: ""},
        {id: "", status:"", area: "", coordinates: ""},
        {id: "", status:"", area: "", coordinates: ""},
        {id: "", status:"", area: "", coordinates: ""},
        {id: "", status:"", area: "", coordinates: ""},
    ]
    let [active, setActive] = useState(1);
    let items = [];
    for (let number = 1; number <= 5; number++) {
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
                   <Col md={4}>
                        Номер участка: {issues[active-1].id}
                        <hr/>
                        Статус: {issues[active-1].status}
                        <hr/>
                        Площадь изменений: {issues[active-1].area}
                        <hr/>
                        Координаты: {issues[active-1].coordinates}
                   </Col>
                   <Col>
                    <iframe className="frame" src="https://rgis.permkrai.ru/map/#/maps/7ac23223-ce0c-48a7-a030-9990bc0307fc?lat=58.635505534704784&lng=56.43127441406251&zoom=10"width="512" height="110"/>
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