import React from "react";
import '../../styles/login-style.css';
import Text from "../input/Text";
import firebs from "../../data/firebaseConfig";

class NewUser extends React.Component
{
    constructor() {
        super()
        this.state = {
            resultCreate: '',
            failedMessage: ''}
    }
    handleNewAccountClick() {
        const firstname = document.getElementById('firstname').value;
        const lastname = document.getElementById('lastname').value;
        const email = document.getElementById('email').value;
        const username = document.getElementById('usernameNew').value;
        const pass = document.getElementById('passwordNew').value;
        let usernameExists = null;
        const conditions = ["#", ".", "$", "[", "]"]
        const checkUsernameInput = conditions.some(item => username.includes(item))
        console.log(checkUsernameInput)
        if(checkUsernameInput === true){
            this.setState({resultCreate: false})
            this.setState({failedMessage:"Username cannot contain # . $ [ ], please try again"})
        }
        else {
            firebs.database().ref('Users/' + username).on('value', (snapshot) => {
                usernameExists = !!snapshot.val();
                if (usernameExists === false) {
                    createNewUser();
                }
                else{
                    this.setState({resultCreate: false})
                    this.setState({failedMessage:"This username already exists, please try again with other credentials"})
                }
            })
        }
        const createNewUser = (usernameExists) => {
            firebs.database().ref('Users/' + username).set({
                Username: username,
                Emailadress: email,
                Firstname: firstname,
                Lastname: lastname,
                Password: pass,
                SavedNamesList: []
            });
            this.setState({resultCreate: true})
            this.props.toggleIsLoggedIn(true)
            this.props.updateUserData(
                {Username: username,
                Emailadress: email,
                Firstname: firstname,
                Lastname: lastname,
                Password: pass,
                SavedNamesList: []}
            );
        }
    }
    handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            this.handleNewAccountClick()
        }
    }
    render() {
        return (
            <div className="Panel" onKeyPress={(event) => this.handleKeyDown(event)}>
                {this.state.resultCreate !== true && <div><h1>New at Nobbie?</h1>
                <h3>create your new account now!</h3>
                <Text
                    id="firstname"
                    label="Firstname"
                />
                <Text
                    id="lastname"
                    label="Lastname"
                />
                <Text
                    id="email"
                    label="Email"
                />
                <Text
                    id="usernameNew"
                    label="Username"
                />
                <Text
                    id="passwordNew"
                    label="Password"
                />
                <button onClick={()=>this.handleNewAccountClick()}>
                    Create new account
                </button></div>}
                {this.state.resultCreate === false &&
                this.state.failedMessage}
            </div>
        )
    }
}
export default NewUser;