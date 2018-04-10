import React from 'react';

const BorderBottom = () => {
    return (
    <div style={styles.line}>
        <hr></hr> 
    </div>
    )

 
}

const styles = { 
    line: {
        backgroundColor: '#ddd',
        height: 2,
        opacity: 0.3
    }
}

export { BorderBottom }