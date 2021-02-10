import React from "react";
import hartje from "../../../IMG/hartje.svg"
import hartjeliked from "../../../IMG/hartjeliked.svg"
import firebs from "../../../data/firebaseConfig";
import NameWithConnection from "./NameWithConnection";


class LikeName extends React.Component
{
    constructor() {
        super()
        this.state = {
            connectionList: [],
            nameWithConnection: false
        }
        this.handleClickLike = this.handleClickLike.bind(this)
        this.handleClickUnLike = this.handleClickUnLike.bind(this)
        this.getConnectionList = this.getConnectionList.bind(this)
    }

    /*Function is triggered in below handleClickLike function
      it gets list of names saved by the connection of user and checks if selected name is existing in list*/
    getConnectionList (name) {
        const connection = this.props.userData.Connection
        if (!!connection) {
            firebs.database().ref('Users/' + connection).on('value', (snapshot) => {
                const connList = !!snapshot.val() ? snapshot.val().SavedNamesList : null;
                this.setState({connectionList:connList})
                if(connList.indexOf(name) > -1){
                    this.setState({nameWithConnection:true})
                }
            })
        }
    }

    /*Function is triggered when like button is clicked*/
    handleClickLike (list) {
        /*push adds name to list*/
        list.push(this.props.nameToAdd)
        /*new list is saved to database for future use*/
        firebs.database().ref('Users/' + this.props.userData.Username).update({
        SavedNamesList: list
        })
        /*Check if name is also in list of users connection*/
        this.getConnectionList(this.props.nameToAdd)
    }

    /*Function is triggered when unlike button is clicked*/
    handleClickUnLike (list) {
        /*pop removes name from list*/
        list.pop(this.props.nameToAdd)
        /*new list is saved to database for future use*/
        firebs.database().ref('Users/' + this.props.userData.Username).update({
            SavedNamesList: list
        })
    }

    render() {
        /*list checks if there is a list of SavedNames for this user*/
        const list = !!this.props.userData.SavedNamesList ? this.props.userData.SavedNamesList : []
        /*isLiked checks if the specific name is already existing in the saved names list for this user*/
        const isLiked = list.indexOf(this.props.nameToAdd) > -1
        return (
            <div>
                {/*when isLiked is false the empty hart picture is shown with function for adding name to list when clicked,
                when isLiked is true the red hart picture is shown with function for removing the name from the list when clicked*/}
                {isLiked === false ? <img onClick={() => this.handleClickLike(list)} id="hartje" alt="like this name" src={hartje}/> :
                <img onClick={() => this.handleClickUnLike(list)} id="hartje" alt="unlike this name" src={hartjeliked}/>}

                {/*when name exists in list of users connection below component is shown*/}
                {this.state.nameWithConnection === true &&
                <NameWithConnection
                    connection = {this.props.userData.Connection}
                    name = {this.props.nameToAdd}
                />
                }
            </div>
        )
    }
}
export default LikeName;
