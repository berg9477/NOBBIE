import React from "react";
import hartjeliked from "../IMG/hartjeliked.svg";

class About extends React.Component
{
    constructor() {
        super()
        this.state = {}
    }

    render() {
        return (
            <div className="mainScreen">
                <p className="mainWrapper">
                   <h1>About Nobbie</h1>
                   <p>
                       Nobbie was created out of a school assignment where a React App needed to be created.
                       As the creator was at that time pragnent and having a hard time finding a right babyname she decided this would be a verry nice subject for the assigment and from there she started on building this App.
                   </p>
                   <p>
                       The mayor goal with creating nobbie was finding a platform where you can save names, share them with your partner and have it give a signal when you both like the same name, but also have the option to apply certain filting so you don't have to go through a bunch of names you already know you don't like
                   </p>
                   <img width="70px" alt='NOBBIE' id="logo" src={hartjeliked}/>
                </p>
            </div>
                )
    }
}
export default About;
