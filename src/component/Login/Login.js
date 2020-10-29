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
    handleButtonClick() {
        const value = this.state.display === 'none' ? 'block' : 'none'
        this.setState({display: value})
    }

    render()
    {
        return (
            <div>
                <button onClick={()=>this.handleButtonClick()}>My Nobbie
                </button>
                <div style={{display: this.state.display}}>

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