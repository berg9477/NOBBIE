import React from 'react';
import abcData from "../../data/abcData";
import Checkbox from "../input/Checkbox";
import "../../styles/search-style.css";

class ABCLists extends React.Component {
    constructor() {
        super()
        this.state = {
            abcLstItems: abcData,
            abcFstItems: abcData,
        }
    }

    render() {
        const abcFstItems = this.state.abcFstItems.map(item => <Checkbox key={item.id + "lst"} item={item}
                                                                         id={item.id + "lst"} list="fstABC"
                                                                         handleClickCheck={this.props.handleClickCheck}/>)
        const abcLstItems = this.state.abcLstItems.map(item => <Checkbox key={item.id + "fst"} item={item}
                                                                         id={item.id + "fst"} list="lstABC"
                                                                         handleClickCheck={this.props.handleClickCheck}/>)
        return (
            <div>
              Name cannot start with letter:
                <fieldset className="checkboxgroup">{abcFstItems}
                </fieldset>
                <br/>
              Name cannot end with letter:
                <fieldset className="checkboxgroup">{abcLstItems}
                </fieldset>
            </div>
        )
    }
}
        export default ABCLists;