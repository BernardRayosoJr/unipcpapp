import React, {Component} from 'react';
import logo from '../../assets/unicitylogo.png';
import { BorderBottom } from '../index'

class Header extends Component {

    render () {
        return (
            <div style={styles.header}>
             <BorderBottom/>
                {/* <div style={styles.logos}>
                    <img src={logo} alt="text" />
                 </div>   
                 <BorderBottom/>
                
             */}
            </div>    
         
        );
    }
}

const styles = {
    header: {
      
        marginBottom: 10,
        
       
    },
    line: {
        backgroundColor: '#ddd',
        height: 2,
        opacity: 0.3
    },
    logos: {
        marginLeft: 30,
        width: '100%',
        padding: 10,
         height: 60,
        textAlign:  'left',
  
    }
}
export { Header }