import React from 'react';

/*Generic input component used throughout the app*/
const InputField = ({label, id, type}) => {
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

export default InputField
