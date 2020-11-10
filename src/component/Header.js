import React from "react";
import nobbieheader from "../IMG/nobbieheader.png";

class Header extends React.Component
{
    constructor() {
        super()
        this.state = {}
    }

    render() {
        return (
            <div>
            <div className="header">
                <img alt='NOBBIE' id="logo" src={nobbieheader}/>
                {this.props.isLoggedIn === false &&
                <p className="loginBTN" onClick={()=>this.props.handleButtonClick(true)}>
                    Login / Sign up
                </p>}
                {this.props.isLoggedIn &&
                <p className="loginBTN" onClick={()=>this.props.handleButtonClick(true)}>
                    My Nobby
                </p>
            }
            </div>
                {this.props.isLoggedIn === false &&
                <div className="join" onClick={()=>this.props.handleButtonClick(true)}>
                    Join Nobbie today and find your name even faster!
                    <div className="triangle"> </div>
                </div>}
            </div>
        )
    }
}
export default Header;


