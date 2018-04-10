import React from 'react';
import { BorderBottom } from '../index'


const HeaderTitle = (props) => {

    return(
        <div>
             <h2 style={styles.h2Style}> {props.headerText} </h2>
             <BorderBottom/>
        </div>    
    

    );
}

const styles = {
    h2Style: {
        marginLeft: 20,
        fontWeight:600,
        letterSpacing: 5,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#d6d7da'

    }
}
export { HeaderTitle }