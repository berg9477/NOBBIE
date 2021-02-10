import React from "react";
import nobbieheader from "../IMG/nobbieheader.png";
import { Link } from 'react-router-dom';

class Header extends React.Component
{
    constructor() {
        super()
        this.state = {}
    }

    render() {
        return (
            <div className="headerWrapper">
            <div className="header">
                <Link to="/">
                    <img alt='NOBBIE' id="logo" src={nobbieheader}/>
                </Link>

                {/*Text changes based upon logic if user is logged in or not*/}
                <p className="loginBTN" onClick={()=>this.props.handleLoginClick(true)}>
                    {this.props.isLoggedIn === false ?
                    "Login / Sign up" : "My Nobby"}
                </p>
            </div>

                {/*Element is only shown when no user is logged in*/}
                {this.props.isLoggedIn === false &&
                <div className="join" onClick={()=>this.props.handleLoginClick(true)}>
                    Join Nobbie today and find your name even faster!
                    <div className="triangle"> </div>
                </div>}
            </div>
        )
    }
}
export default Header;


