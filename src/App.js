import React from 'react';
import Search from "./component/Search/Search";
import './styles/App.css';
import Login from "./component/Login/Login";
import nobbieheader from "./IMG/nobbieheader.png";


class App extends React.Component
{
    constructor() {
        super()
        this.state = {
            userData: [],
            isLoggedIn: false
        }
        this.toggleIsLoggedIn = this.toggleIsLoggedIn.bind(this)
        this.updateUserData = this.updateUserData.bind(this)

    }

    toggleIsLoggedIn(value) {
        this.setState({isLoggedIn:value});
    }

    updateUserData(value) {
        this.setState({userData:value})
    }
    render()
    {

        return (
            <div className="App">
                <p><img alt='NOBBIE' src={nobbieheader}/></p>
                <p className="intro">Looking for a name for your baby? Then nobbie is the place that can help you! Search through almost 10.000 names, see where they origin from and save all the names you like by making your own Nobbie Account! Want to see if your partner also likes the name? Connect your accounts and Nobbie will let you know if you both liked it!</p>
                <Login
                    toggleIsLoggedIn={this.toggleIsLoggedIn}
                    updateUserData={this.updateUserData}
                    userData={this.state.userData}
                    isLoggedIn={this.state.isLoggedIn}
                />
                <Search
                    userData={this.state.userData}
                    isLoggedIn={this.state.isLoggedIn}
                />
            </div>
        );
    }
}

export default App;
