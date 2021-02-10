import React from "react";
import { Link } from 'react-router-dom';


class Footer extends React.Component
{
    constructor() {
        super()
        this.state = {}
    }

    render() {
        return (
            <div className="footer">
                {/*footer with link to the About page*/}
                &copy; 2021 Nobbie, inc. All rights reserved - &nbsp;
                    <Link to="/About" className="aboutBTN">
                        About Us
                    </Link>
            </div>
        )
    }
}
export default Footer;
