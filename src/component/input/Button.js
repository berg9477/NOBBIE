import React from 'react';

//Component voor het defineren van een slider element
const Button = (props) => {
    return (
        <div>
                <button
                    type="button"
                    onClick={() => props.handleClickCheck(props.id)}
                    >
                    {props.id}
                </button>
        </div>)
};

export default Button