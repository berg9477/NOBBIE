import React from "react";
import InputField from "../input/InputField";
import firebs from "../../data/firebaseConfig";

class NewUser extends React.Component
{
    constructor() {
        super()
        this.state = {
            resultCreate: '',
            failedMessage: ''}
    }

    /*Function triggered when create new account button is clicked
    it processes the input values and (when valid) creates a new account in the database*/
    handleNewAccountClick() {
        /*get input field values*/
        const firstname = document.getElementById('firstname').value;
        const lastname = document.getElementById('lastname').value;
        const email = document.getElementById('email').value;
        const username = document.getElementById('usernameNew').value;
        const pass = document.getElementById('passwordNew').value;

        let usernameExists = null;
        /*All fields are required and need to have a value*/
        if(firstname === "" || lastname === "" || email === "" || username === "" || pass === ""){
            this.setState({resultCreate: false})
            this.setState({failedMessage:"Oeps! Seems like you forgot to fill in one or more fields"})
        }
        else{
            /*Firebase does not accept these characters for the username so need to be filtered out*/
            const conditions = ["#", ".", "$", "[", "]"]
            const checkUsernameInput = conditions.some(item => username.includes(item))
            /*Give user feedback message about input rules*/
            if(checkUsernameInput === true){
                this.setState({resultCreate: false})
                this.setState({failedMessage:"Username cannot contain # . $ [ ], please try again with other credentials"})
            }
            else {
                /*retrieve existing usernames from database to check if username is not already being used*/
                firebs.database().ref('Users/' + username).on('value', (snapshot) => {
                    usernameExists = !!snapshot.val();
                    /*if valid new user is created*/
                    if (usernameExists === false) {
                        createNewUser();
                    }
                    /*Give user feedback message about username already existing*/
                    else {
                        this.setState({resultCreate: false})
                        this.setState({failedMessage: "This username already exists, please try again with other credentials"})
                    }
                })
            }
        }
        const createNewUser = () => {
            /*write user data to firebase database*/
            firebs.database().ref('Users/' + username).set({
                Username: username,
                Emailadress: email,
                Firstname: firstname,
                Lastname: lastname,
                Password: pass,
                SavedNamesList: []
            });
            /*set user data and logged in status true to objects */
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

    /*function to make Enter-key also a valid trigger for processing new account input*/
    handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            this.handleNewAccountClick()
        }
    }

    render() {
        return (
            <div className="loginWrapper" onKeyPress={(event) => this.handleKeyDown(event)}>
                {this.state.resultCreate !== true && <div><h1>New at Nobbie?</h1>
                <h3>create your new account now!</h3>
                <InputField
                    id="firstname"
                    label="Firstname"
                />
                <InputField
                    id="lastname"
                    label="Lastname"
                />
                <InputField
                    id="email"
                    label="Email"
                />
                <InputField
                    id="usernameNew"
                    label="Username"
                />
                <InputField
                    id="passwordNew"
                    label="Password"
                />
                <button onClick={()=>this.handleNewAccountClick()}>
                    Create new account
                </button></div>}
                {/*shows results why creating account is not working*/}
                {this.state.resultCreate === false &&
                this.state.failedMessage}
            </div>
        )
    }
}
export default NewUser;
