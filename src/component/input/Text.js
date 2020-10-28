import React from 'react';
import '../../App.css';


//Component voor het defineren van een slider element
const Text = ({label, id}) => {
    return (
        <div>
            {/* text boven input */}
            <label>{label}</label>
            {/* input zelf */}
            <input
                id={id}
                type="text"
            />

        </div>)
};

export default Text