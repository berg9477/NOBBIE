import React from "react";
import '../../styles/login-style.css';
import NewUser from "./NewUser";
import ExistingUser from "./ExistingUser";
import ProfilePage from "./Profile/profilePage";

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
            <div className="PanelOverlay">
                <div className="ModalPanel">
                    {/*button for closing the screen*/}
                    <span className="closeBTN" onClick={()=>this.props.handleLoginClick(false)}>&times;</span>

                    {/*login or create account input fields shown when user is not logged in*/}
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
                    {/*when user is logged in shows the profile page*/}
                    {this.props.isLoggedIn === true &&
                        <ProfilePage
                            userData={this.props.userData}
                        />}
                </div>
            </div>)
    }
}

export default Login;
