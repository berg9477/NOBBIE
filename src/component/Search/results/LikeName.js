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

    handleClickLike (list) {
        list.push(this.props.nameToAdd)
        firebs.database().ref('Users/' + this.props.userData.Username).update({
        SavedNamesList: list
        })
        this.getConnectionList(this.props.nameToAdd)
    }

    handleClickUnLike (list) {
        list.pop(this.props.nameToAdd)
        firebs.database().ref('Users/' + this.props.userData.Username).update({
            SavedNamesList: list
        })
    }

    render() {
        const list = !!this.props.userData.SavedNamesList ? this.props.userData.SavedNamesList : []
        const isLiked = list.indexOf(this.props.nameToAdd) > -1
        return (
            <div>
                {isLiked === false && <img onClick={() => this.handleClickLike(list)} id="hartje" alt="like this name" src={hartje}/>}
                {isLiked === true && <img onClick={() => this.handleClickUnLike(list)} id="hartje" alt="unlike this name" src={hartjeliked}/>}
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