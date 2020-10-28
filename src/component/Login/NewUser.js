import React from "react";
import '../../styles/login-style.css';
import Text from "../input/Text";
import firebs from "../../data/firebaseConfig";

class NewUser extends React.Component
{
    constructor() {
        super()
        this.state = {
            resultCreate: ''}
    }
    handleNewAccountClick() {
        const firstname = document.getElementById('firstname').value;
        const lastname = document.getElementById('lastname').value;
        const email = document.getElementById('email').value;
        const username = document.getElementById('usernameNew').value;
        const pass = document.getElementById('passwordNew').value;
        let usernameExists = null;
        firebs.database().ref('Users/'+username).on('value', (snapshot) => {
            usernameExists = !!snapshot.val();
            createNewUser(usernameExists);
        })
        const createNewUser = (usernameExists) => {
            if (usernameExists === false) {
                firebs.database().ref('Users/' + username).set({
                    Username: username,
                    Emailadress: email,
                    Firstname: firstname,
                    Lastname: lastname,
                    Password: pass,
                    SavedNamesList: []
                });
                this.setState({resultCreate: true})
                this.props.updateUserData(
                    {Username: username,
                    Emailadress: email,
                    Firstname: firstname,
                    Lastname: lastname,
                    Password: pass,
                    SavedNamesList: []}
                );
            } else {
                this.setState({resultCreate: false})
            }
        }
    }
    handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            this.handleNewAccountClick()
        }
    }
    render() {
        return (
            <div onKeyPress={(event) => this.handleKeyDown(event)}>
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
                {this.state.resultCreate === true &&
                <p>You are now registerd. Welcome at Nobbie!</p>}
                {this.state.resultCreate === false &&
                <p>This username already exists, please try again with other credentials</p>}
            </div>
        )
    }
}
export default NewUser;