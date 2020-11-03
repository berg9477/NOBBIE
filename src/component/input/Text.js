import React from 'react';
import '../../styles/App.css';


const Text = ({label, id, type}) => {
    return (
        <div>
            <input
                className={id}
                placeholder={label}
                id={id}
                type={type}
            />

        </div>)
};

export default Text