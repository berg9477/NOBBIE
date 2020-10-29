import React from 'react';
import '../../styles/Checkbox-style.css'

//Component voor het defineren van een slider element
const Checkbox = (props) => {
    return (
        <div>
                <input
                    type="checkbox"
                    onClick={() => props.handleClickCheck(props.id, props.item.label, props.list)}
                    id={props.id}
                />
            <label htmlFor={props.id} className="button">{props.item.label}</label>



        </div>)
};

export default Checkbox