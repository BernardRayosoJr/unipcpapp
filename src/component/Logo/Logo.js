import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import logo from '../../assets/logo_unicity.png'


class Logo extends Component  {

    render () {
        
        return (
         <Row className="show-grid">
            <Col xs={2} xsOffset={0}>
                <a href="http://www.unicity.com/philippines/">
                    <img src={logo} alt="" />
                </a>
            </Col>
         </Row>
    
    
        );
    }
 


}

export { Logo }