import React from "react";

/*Dropdown menu for selecting specific gender in filtering search options*/
const GenderSelect = () => {
    return (
        <div>
            <label>Gender
                <select name="gender" id="gender">
                    <option value="" defaultValue>Select an option</option>
                    <option value="M">Male</option>
                    <option value="V">Female</option>
                </select></label>

        </div>)
};

export default GenderSelect
