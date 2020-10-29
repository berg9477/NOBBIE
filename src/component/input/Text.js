import React from 'react';
import '../../App.css';


const Text = ({label, id}) => {
    return (
        <div>
            <input
                className={id}
                placeholder={label}
                id={id}
                type="text"
            />

        </div>)
};

export default Text