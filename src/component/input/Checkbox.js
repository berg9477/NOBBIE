import React from 'react';
import '../../App.css';

//Component voor het defineren van een slider element
const Checkbox = (props) => {
    return (
        <div>
            <label>
                <input
                    type="checkbox"
                    onClick={() => props.handleClickCheck(props.id, props.item.label, props.list)}
                    id={props.id}
                />
                {props.item.label}
            </label>


        </div>)
};

export default Checkbox