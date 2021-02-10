import React from "react";
import InputField from "../input/InputField";
import firebs from "../../data/firebaseConfig";
import rainbow from "../../IMG/rainbow.png";

class ExistingUser extends React.Component
{
    constructor() {
        super()
        this.state = {
            loginSuccess: ''
        }
    }

    /*Function is triggered when login button is pushed*/
    handleConfirmLoginClick() {
        /*get values from input fields*/
        const usernameIn = document.getElementById('usernameLogin').value;
        const passwordIn = document.getElementById('passwordLogin').value;

        /*connect to firebase database for retrieving username*/
        firebs.database().ref('Users/'+usernameIn).on('value', (snapshot) => {
            const passwordOut = !!snapshot.val() ? snapshot.val().Password : null;
            /*check if password from input field is same as password from database*/
            if (passwordOut === passwordIn) {
                this.props.toggleIsLoggedIn(true);
                this.props.updateUserData(snapshot.val());
                this.setState({loginSuccess:true});
            } else { /*login is not successful*/
                this.props.toggleIsLoggedIn(false);
                this.setState({loginSuccess:false})
            }
        })
    }

    /*function to make Enter-key also a valid trigger for login in*/
    handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            this.handleConfirmLoginClick()
        }
    }

    render() {
        return (
                <div className="loginWrapper">
                    {/*login input fields only shown when user is not logged in*/}
                    {(this.state.loginSuccess === '' || this.state.loginSuccess === false) &&
                        <div onKeyPress={(event) => this.handleKeyDown(event)}>
                        <h1><img alt='rainbow' id="littleRainbow" height='20px' src={rainbow}/> Existing user</h1>
                            <InputField
                                id="usernameLogin"
                                label="Username"
                            />
                            <InputField
                                id="passwordLogin"
                                label="Password"
                                type="password"
                            />
                            <button onClick={()=>this.handleConfirmLoginClick()}>
                                Login
                            </button>
                        </div>}
                    {/*Message is shown when login was unsuccessful*/}
                    {(this.props.isLoggedIn === false && this.state.loginSuccess === false) &&
                        <p>
                            Incorrect username and/or password, please try again
                        </p>}
                </div>
        )
    }
}
export default ExistingUser;
