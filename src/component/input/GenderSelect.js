import React from "react";


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