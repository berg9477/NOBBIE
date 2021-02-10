import React from 'react';

/*Generic button component used throughout the app*/

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
