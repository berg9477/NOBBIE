import React from "react";
import '../../styles/login-style.css';
import NewUser from "./NewUser";
import ExistingUser from "./ExistingUser";

class Login extends React.Component
{
    constructor() {
        super()
        this.state = {
            display: 'none'
        }
        this.handleButtonClick = this.handleButtonClick.bind(this);

    }
    handleButtonClick(value) {
        this.setState({display: value})
    }

    render()
    {
        return (
            <div>
                <button onClick={()=>this.handleButtonClick("block")}>Login
                </button>
                <div style={{display: this.state.display}}>
                    <button onClick={()=>this.handleButtonClick("none")}>Close
                    </button>
                  <ExistingUser
                    toggleIsLoggedIn={this.props.toggleIsLoggedIn}
                    updateUserData={this.props.updateUserData}
                    isLoggedIn={this.props.isLoggedIn}
                    userData={this.props.userData}
                  />
                  {this.props.isLoggedIn !== true &&
                  <NewUser
                      updateUserData={this.props.updateUserData}
                      isLoggedIn={this.props.isLoggedIn}
                      userData={this.props.userData}
                  />}
                </div>
            </div>)
    }
}

export default Login;