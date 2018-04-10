import React, { Component } from 'react';
import { Row, Col, PageHeader  } from 'react-bootstrap'


const PageHeaderTitle = props => {

    return (
        <Row className="show-grid">
            <Col xs={12} md={12}>
            <PageHeader style={{textAlign:'left'}}>
            {props.title}<br/> <small>{props.small}</small>
        </PageHeader>
        </Col>
       </Row>

    );
}
  




export { PageHeaderTitle }
