import React from "react";
import ListOfSavedNames from "./ListOfSavedNames";
import MakeUserConnection from "./MakeUserConnection";
import rainbow from "../../../IMG/rainbow.png";

class ProfilePage extends React.Component
{
    constructor() {
        super()
        this.state = {
            showNameList: false,
            makeConnection: false,
        }
        this.setShowNameList = this.setShowNameList.bind(this)
        this.setMakeConnection = this.setMakeConnection.bind(this)

    }

    setShowNameList () {
        this.setState({showNameList:true})
        this.setState({makeConnection:false})

    }
    setMakeConnection () {
        this.setState({makeConnection:true})
        this.setState({showNameList:false})
    }

    render() {
        const connectionMade = this.props.userData.Connection !== undefined;
        const user = this.props.userData
        return (
            <div className="ProfilePage">
                <h1><img alt='rainbow' id="littleRainbow" height='30px' src={rainbow}/> Hello {user.Firstname} {user.Lastname}</h1>
                <div className="dottedRowHorz"> </div>
                {connectionMade === false &&
                <p>
                    <button onClick={() => this.setMakeConnection()}>make connection to other user</button>
                </p>}
                {connectionMade === true &&
                    <p>
                        You are connected to user <b>{this.props.userData.Connection}</b>
                    </p>}
                {this.state.makeConnection === true &&
                    <MakeUserConnection
                        Username = {this.props.userData.Username}

                     />}
                <ListOfSavedNames
                    SavedNamesList = {this.props.userData.SavedNamesList}
                    connection = {this.props.userData.Connection}
                />
            </div>
        )
    }
}
export default ProfilePage;