import React, { Component } from 'react';
import {
        Navbar,
        Nav,
        NavItem
} from 'react-bootstrap';


class NavigationBar extends Component {

    render (props) {

        return (        
          <Navbar {...props}>
             <Nav>
              <NavItem eventKey={1} href="#">
                 ENROLL
              </NavItem>
            </Nav>
          </Navbar>

        );
    };
}

export { NavigationBar };