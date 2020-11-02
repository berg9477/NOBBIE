import React from "react";
import '../../styles/login-style.css';
import Text from "../input/Text";
import firebs from "../../data/firebaseConfig";
import ProfilePage from "../profilePage/profilePage";

class ExistingUser extends React.Component
{
    constructor() {
        super()
        this.state = {
            loginSuccess: ''
        }
    }

    handleLoginClick() {
        const usernameIn = document.getElementById('usernameLogin').value;
        const passwordIn = document.getElementById('passwordLogin').value;
        firebs.database().ref('Users/'+usernameIn).on('value', (snapshot) => {
            const passwordOut = !!snapshot.val() ? snapshot.val().Password : null;
            if (passwordOut === passwordIn) {
                this.props.toggleIsLoggedIn(true);
                this.props.updateUserData(snapshot.val());
                this.setState({loginSuccess:true})

            } else {
                this.props.toggleIsLoggedIn(false);
                this.setState({loginSuccess:false})
            }
        })
    }
    handleKeyDown = (e) => {
        if(e.key === 'Enter'){
            this.handleLoginClick()
        }
    }
    render() {
        return (
            <div className="Panel">
                {(this.state.loginSuccess === '' || this.state.loginSuccess === false) &&
                    <div onKeyPress={(event) => this.handleKeyDown(event)}>
                    <h1>Existing user</h1>
                        <Text
                            id="usernameLogin"
                            label="Username"
                        />
                        <Text
                            id="passwordLogin"
                            label="Password"
                            type="password"
                        />
                        <button onClick={()=>this.handleLoginClick()}>
                            Login
                        </button>
                    </div>}
                {(this.props.isLoggedIn === false && this.state.loginSuccess === false) &&
                    <p>
                        Incorrect username and/or password, please try again
                    </p>}
            </div>
        )
    }
}
export default ExistingUser;
