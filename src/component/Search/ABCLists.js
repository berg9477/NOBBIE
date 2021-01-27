import React from 'react';
import abcData from "../../data/abcData";
import Checkbox from "../input/Checkbox";
import "../../styles/search-style.css";

class ABCLists extends React.Component {
    constructor() {
        super()
        this.state = {
            abcLstItems: abcData,
            abcFstItems: abcData
        }
    }

    render() {
        const abcFstItems = this.state.abcFstItems.map(item => <Checkbox key={item.id + "fst"} item={item}
                                                                         id={item.id + "fst"} list="fstABC"
                                                                         handleClickCheck={this.props.handleClickCheck}/>)
        const abcLstItems = this.state.abcLstItems.map(item => <Checkbox key={item.id + "lst"} item={item}
                                                                         id={item.id + "lst"} list="lstABC"
                                                                         handleClickCheck={this.props.handleClickCheck}/>)

        return (
            <div className="lettersWrapper">
              Name <b>cannot</b> start with letter:
                <div className="ABCrow">{abcFstItems}
                </div>
                <br/>
              Name <b>cannot</b> end with letter:
                <div className="ABCrow">{abcLstItems}
                </div>
            </div>
        )
    }
}
        export default ABCLists;