import React from "react";
import Text from "../input/Text";
import firebs from "../../data/firebaseConfig";


class MakeUserConnection extends React.Component
{
    constructor() {
        super()
        this.state = {
            connectionSuccess: '',
            nameOfUser: ''
        }
        this.handleMakeConnection = this.handleMakeConnection.bind(this)
    }

    handleMakeConnection () {
        const userToConnect = document.getElementById('nameOfUser').value;
        this.setState({nameOfUser:userToConnect})
        firebs.database().ref('Users/' + userToConnect).on('value', (snapshot) => {
            const usernameExists = !!snapshot.val();
            connectUsers(usernameExists);
        })
        const connectUsers = (usernameExists) => {
            if (usernameExists === true) {
                firebs.database().ref('Users/' + this.props.Username).update({
                    Connection: userToConnect
                })
                firebs.database().ref('Users/' + userToConnect).update({
                    Connection: this.props.Username
                })
                this.setState({connectionSuccess: true})
            }
            else {
                this.setState({connectionSuccess: false})
            }

        }
    }

    render() {
        return (
            <div>{this.state.connectionSuccess !== true &&
            <div>
                Please fill in the username of the person you want to connect with:
                <Text
                    id="nameOfUser"
                    label="Username"
                />
                <button onClick={() => this.handleMakeConnection()} >Make connection</button>
            </div>}
                {this.state.connectionSuccess === false &&
                <p>
                    This username is unknown, please try again.
                </p>}
            </div>
        )
    }
}
export default MakeUserConnection;