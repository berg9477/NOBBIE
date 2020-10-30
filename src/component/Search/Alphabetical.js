import React from 'react';
import abcData from "../../data/abcData";
import "../../styles/search-style.css";
import firebs from "../../data/firebaseConfig";
import Button from "../input/Button";


class Alphabetical extends React.Component
{
    constructor() {
        super()
        this.state = {
            abcItems: abcData,
            ABC: []
        }
        this.handleClickCheck = this.handleClickCheck.bind(this);
    }

    handleClickCheck(id) {
        this.props.setSearchResult([])
        this.props.setLoading(true)
            const db = firebs.database();
            const listOfNames = db.ref('BabyNames');
            const query = listOfNames
                .orderByChild('firstname')
                .startAt(id.toLowerCase())
                .endAt(id.toLowerCase() + "\uf8ff")
            query.on("value", (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    const data = childSnapshot.val();
                    this.props.addToSearchResult(data)
                })
            })
    }

    render() {
        const abcItems = this.state.abcItems.map((item, index) => <Button id={item.id}  key={index} handleClickCheck={this.handleClickCheck}/>)
        return (
            <div>
                <h3>Get all names that start with:</h3>
                <div className="row">{abcItems}
                </div>
                <br/>
            </div>
        )
    }
}
export default Alphabetical;