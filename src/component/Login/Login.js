import React from "react";
import '../../styles/login-style.css';
import NewUser from "./NewUser";
import ExistingUser from "./ExistingUser";
import ProfilePage from "../profilePage/profilePage";

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
                <button onClick={()=>this.handleButtonClick()}>
                    My Nobbie
                </button>
                <div className="Login" style={{display: this.state.display}}>
                  {this.props.isLoggedIn !== true &&
                      <div>
                          <ExistingUser
                          toggleIsLoggedIn={this.props.toggleIsLoggedIn}
                          updateUserData={this.props.updateUserData}
                          isLoggedIn={this.props.isLoggedIn}
                          userData={this.props.userData}
                          />
                          <NewUser
                          updateUserData={this.props.updateUserData}
                          userData={this.props.userData}
                          toggleIsLoggedIn={this.props.toggleIsLoggedIn}
                          />
                      </div>}
                    {this.props.isLoggedIn === true &&
                        <ProfilePage
                            userData={this.props.userData}
                        />}
                </div>
            </div>)
    }
}

export default Login;