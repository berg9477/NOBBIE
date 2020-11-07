import React from "react";
import '../../styles/login-style.css';
import NewUser from "./NewUser";
import ExistingUser from "./ExistingUser";
import ProfilePage from "./profilePage/profilePage";

class Login extends React.Component
{
    constructor() {
        super()
        this.state = {
        }
    }

    render()
    {
        return (
            <div className="LoginOverlay">
                <div className="ProfilePanel">
                    <span className="closeBTN" onClick={()=>this.props.handleButtonClick(false)}>&times;</span>
                  {this.props.isLoggedIn !== true &&
                      <div className='Login'>
                          <ExistingUser
                          toggleIsLoggedIn={this.props.toggleIsLoggedIn}
                          updateUserData={this.props.updateUserData}
                          isLoggedIn={this.props.isLoggedIn}
                          userData={this.props.userData}
                          />
                          <div className="dottedRowVert"> </div>
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