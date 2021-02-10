import React from "react";
import InputField from "../../input/InputField";
import firebs from "../../../data/firebaseConfig";


class MakeUserConnection extends React.Component
{
    constructor() {
        super()
        this.state = {
            connectionSuccess: '',
            nameOfUser: '',
            failedMessage: ''
        }
        this.handleMakeConnection = this.handleMakeConnection.bind(this)
    }

    /*function is triggered when make connection button is clicked
    it connects to database and registers connection there */
    handleMakeConnection () {
        /*Get input field value for username connection*/
        const userToConnect = document.getElementById('nameOfUser').value;
        /*Check if input is not same as current username*/
        if(userToConnect !== this.props.Username) {
            this.setState({nameOfUser: userToConnect})
            /*Get existing usernames from database*/
            firebs.database().ref('Users/' + userToConnect).on('value', (snapshot) => {
                /*Check if username exists in database*/
                const usernameExists = !!snapshot.val();
                /*triggers below function connectUsers*/
                connectUsers(usernameExists);
            })
            const connectUsers = (usernameExists) => {
                /*Only write connection to database if username exists*/
                if (usernameExists === true) {
                    /*Write connection to current user*/
                    firebs.database().ref('Users/' + this.props.Username).update({
                        Connection: userToConnect
                    })
                    /*Write current username to connections connection*/
                    firebs.database().ref('Users/' + userToConnect).update({
                        Connection: this.props.Username
                    })
                    this.setState({connectionSuccess: true})

                } else { /*Give message explaining username does not exist*/
                    this.setState({connectionSuccess: false})
                    this.setState({failedMessage:"This username is unknown, please try again."})
                }
            }
        } else { /*Give message explaining username can not be own username*/
            this.setState({connectionSuccess: false})
            this.setState({failedMessage:"Cannot connect to your own username, please try again."})
        }
    }

    render() {
        return (
            /*only show option when connection is not already successful*/
            <div>{this.state.connectionSuccess !== true &&
            <div>
                Please fill in the username of the person you want to connect with:
                <InputField
                    id="nameOfUser"
                    label="Username"
                />
                <button onClick={() => this.handleMakeConnection()} >Make connection</button>
            </div>}
                {/*show failed message when connection not successful*/}
                {this.state.connectionSuccess === false &&
                <p>
                    {this.state.failedMessage}
                </p>}
            </div>
        )
    }
}
export default MakeUserConnection;
