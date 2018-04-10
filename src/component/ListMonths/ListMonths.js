import React from 'react';
import { BorderBottom } from '../index'

import { 
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock
} from 'react-bootstrap';




const ListMonths = (props) => {


 var ArrMonths = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ],
  
CreateMonths = function(months) {
    return <option>{months}</option>;
};


return (
<div>

    <FormControl componentClass="select"  {...props.children}
    // placeholder=""
    
    // inputRef={(input) => this.inputMonth = input}
    {...props.inputRef}
    >
    {ArrMonths.map(CreateMonths)}
    </FormControl>

</div>


)


   
}


function FieldGroup({ id, validation, label, length, help, inputRef, ...props }) {
    return (
      <FormGroup validationState={validation} controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props}
         maxLength={length}
         inputRef={inputRef} />
          <FormControl.Feedback />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }


export { ListMonths }


