import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

class AlertWarning extends Component {
    
    render() {

        return(
            <Alert bsStyle="danger" >
                <h4> <strong>*FOR PHILIPPINE MARKET ONLY</strong></h4> 
                Please contact Unicity if you experience any problems with this application or if you have any questions
          </Alert>
        );
    };


}

export { AlertWarning }
