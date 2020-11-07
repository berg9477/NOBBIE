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
                <img alt='NOBBIE' height='120px' src={nobbieheader}/>
                <p className="loginBTN" onClick={()=>this.props.handleButtonClick(true)}>Login / Sign up</p>
            </div>
                <div className="join" onClick={()=>this.props.handleButtonClick(true)}>Join Nobbie today and find your name even faster! <div className="triangle"></div>
                </div>
            </div>
        )
    }
}
export default Header;


