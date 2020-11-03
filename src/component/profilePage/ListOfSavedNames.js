import React from "react";
import firebs from "../../data/firebaseConfig";

class ListOfSavedNames extends React.Component
{
    constructor() {
        super()
        this.state = {
            sharedNamesList: [],
            list: []
        }
        this.renderSavedNames = this.renderSavedNames.bind(this)
        this.getConnectionList = this.getConnectionList.bind(this)
        this.getNameList = this.getNameList.bind(this)
    }

    getNameList () {
        this.setState({list:this.renderSavedNames(this.props.SavedNamesList)})
        this.getConnectionList()
    }

    renderSavedNames (list) {
        return list.map((item, index) => {
            return (
                <li key={index}>{item}</li>
            )
        })
    }


    getConnectionList () {
        const connection = this.props.connection
        const finalList = []
        if (!!connection) {
            firebs.database().ref('Users/' + connection).on('value', (snapshot) => {
                const connList = snapshot.val() !== undefined && snapshot.val().SavedNamesList !== undefined ? snapshot.val().SavedNamesList : null;
                if(!!connList) {
                    connList.forEach(item => {
                        if (this.props.SavedNamesList.indexOf(item) > -1) {
                            finalList.push(item)
                        }
                    })
                    this.setState({sharedNamesList: this.renderSavedNames(finalList)})
                }
            })
        }
    }

    render() {
        return (
            <div>
                <button onClick={() => this.getNameList()}>
                    Show my saved names
                </button>
                {this.state.list.length !== 0 &&
                <div>Here is an overview of all the baby names you have saved:
                    <ul key="list">
                        {this.state.list}
                    </ul>
                </div>}
                {this.state.sharedNamesList.length !== 0 &&
                <div>Here is an overview of all the baby names you and {this.props.connection} share:
                    <ul key="shared">
                        {this.state.sharedNamesList}
                    </ul>
                </div>}
                {this.props.SavedNamesList === undefined &&
                <div>
                    You haven't saved any names yet. Start your search now!
                </div>}
            </div>
        )
    }
}
export default ListOfSavedNames;