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

    /*Function is triggered when show my saved names button is clicked
    it gets the saved names for user and (if connection is made) from connection using below two functions*/
    getNameList () {
        this.setState({list:this.renderSavedNames(this.props.SavedNamesList)})
        this.getConnectionList()
        this.setState({showListButton:false})
    }

    /*Function is triggered in above function getNameList
    It formats the list of saved names*/
    renderSavedNames (list) {
        return list.map((item, index) => {
            return (
                <span key={index}>{item}<br/></span>
            )
        })
    }
    /*Function is triggered in above function getNameList
    It connects to the database and retrieves the list of saved names for users connection
    and writes names that are both in list of current user and list of connection to local list object*/
    getConnectionList () {
        /*check if user has connection*/
        const connection = this.props.connection
        const finalList = []
        if (!!connection) {
            /*connect to database and retrieve data from connection*/
            firebs.database().ref('Users/' + connection).on('value', (snapshot) => {
                /*check if connection data retrieving was successful and has saved names*/
                const connList = snapshot.val() !== undefined && snapshot.val().SavedNamesList !== undefined ? snapshot.val().SavedNamesList : null;
                if(!!connList) {
                    connList.forEach(item => {
                        /*only save names that are in SavedNamesList of connection and in SavedNamesList of current user*/
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
            /*only show option when user has names saved*/
            <div>{(this.state.showListButton && this.props.SavedNamesList !== undefined) &&
                <button onClick={() => this.getNameList()}>
                    Show my saved names
                </button>}

                {/*List of saved names by user*/}
                {this.state.list.length !== 0 &&
                <div>Here is an overview of all the baby names you have saved:
                    <p>{this.state.list}</p>
                </div>}

                {/*list of names saved by both user and connection*/}
                {this.state.sharedNamesList.length !== 0 &&
                <div>
                    <div className="dottedRowHorz"> </div>
                    <br/>
                    Here is an overview of all the baby names you and {this.props.connection} share:
                    <p>{this.state.sharedNamesList}</p>
                </div>}

                {/*message if user has no saved names registered*/}
                {this.props.SavedNamesList === undefined &&
                <div>
                    You haven't saved any names yet. Start your search now!
                </div>}
            </div>
        )
    }
}
export default ListOfSavedNames;
