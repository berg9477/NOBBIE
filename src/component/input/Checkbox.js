import React from 'react';

/*Generic Checkbox component used for Alphabetical buttons in app*/
const Checkbox = (props) => {
    return (
        <div>
                <input
                    type="checkbox"
                    onClick={() => props.handleClickCheck(props.id, props.item.label, props.list)}
                    id={props.id}
                />
            <label htmlFor={props.id} className="lettersCheckbox">{props.item.id}</label>



        </div>)
};

export default Checkbox
