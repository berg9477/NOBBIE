import React from 'react';
import Search from "./component/Search/Search";
import './styles/App.css';
import Login from "./component/Login/Login";
import Header from "./component/Header";
import Intro from "./component/Intro";

class App extends React.Component
{
    constructor() {
        super()
        this.state = {
            userData: [],
            isLoggedIn: false,
            displayInlog: false
        }
        this.toggleIsLoggedIn = this.toggleIsLoggedIn.bind(this)
        this.updateUserData = this.updateUserData.bind(this)
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleButtonClick(value) {
        this.setState({displayInlog: value})
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
                <Header
                    handleButtonClick = {this.handleButtonClick}
                />
                <div className="mainSearch">
                    <Intro/>
                    {this.state.displayInlog === true &&
                    <Login
                    toggleIsLoggedIn={this.toggleIsLoggedIn}
                    updateUserData={this.updateUserData}
                    userData={this.state.userData}
                    isLoggedIn={this.state.isLoggedIn}
                    />}
                    <Search
                    userData={this.state.userData}
                    isLoggedIn={this.state.isLoggedIn}
                    />
                </div>
            </div>
        );
    }
}

export default App;
