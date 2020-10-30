import React from 'react';
import '../../App.css';


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