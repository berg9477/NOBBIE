import React from "react";
import firebs from "../../../data/firebaseConfig";

class ListOfSavedNames extends React.Component
{
    constructor() {
        super()
        this.state = {
            sharedNamesList: [],
            list: [],
            showListButton: true
        }
        this.renderSavedNames = this.renderSavedNames.bind(this)
        this.getConnectionList = this.getConnectionList.bind(this)
        this.getNameList = this.getNameList.bind(this)
    }

    getNameList () {
        this.setState({list:this.renderSavedNames(this.props.SavedNamesList)})
        this.getConnectionList()
        this.setState({showListButton:false})
    }

    renderSavedNames (list) {
        return list.map((item, index) => {
            return (
                <span key={index}>{item}<br/></span>
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
            <div>{(this.state.showListButton && this.props.SavedNamesList !== undefined) &&
                <button onClick={() => this.getNameList()}>
                    Show my saved names
                </button>}
                {this.state.list.length !== 0 &&
                <div>Here is an overview of all the baby names you have saved:
                    <p>{this.state.list}</p>
                </div>}
                {this.state.sharedNamesList.length !== 0 &&
                <div>
                    <div className="dottedRowHorz"> </div>
                    <br/>
                    Here is an overview of all the baby names you and {this.props.connection} share:
                    <p>{this.state.sharedNamesList}</p>
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