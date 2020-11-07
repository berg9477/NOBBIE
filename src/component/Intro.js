import React from "react";

class Intro extends React.Component
{
    constructor() {
        super()
        this.state = {}
    }

    render() {
        return (
            <div className="intro">
                <h1>Welcome to Nobbie, your personal name finder</h1>
                <p className="intro">Looking for a name for your baby? Then nobbie is the place that can help you! Search through almost 10.000 names, see where they origin from and save all the names you like by making your own Nobbie Account! Want to see if your partner also likes the name? Connect your accounts and Nobbie will let you know if you both liked it!</p>
                <p className="dottedRowHorz"> </p>
            </div>
        )
    }
}
export default Intro;