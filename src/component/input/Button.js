import React from 'react';

const Button = (props) => {
    return (
        <div>
                <button
                    className="lettersButton"
                    type="button"
                    onClick={() => props.handleClickCheck(props.id)}
                    >
                    {props.id}
                </button>
        </div>)
};

export default Button