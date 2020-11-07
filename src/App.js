import React from 'react';
import MainScreen from "./component/Search/MainScreen";
import './styles/App.css';
import Login from "./component/Login/Login";
import Header from "./component/Header";

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
                {this.state.displayInlog === true &&
                <Login
                    handleButtonClick = {this.handleButtonClick}
                    toggleIsLoggedIn={this.toggleIsLoggedIn}
                    updateUserData={this.updateUserData}
                    userData={this.state.userData}
                    isLoggedIn={this.state.isLoggedIn}
                />}
                <div className="mainScreen">
                    <MainScreen
                    userData={this.state.userData}
                    isLoggedIn={this.state.isLoggedIn}
                    />
                </div>
            </div>
        );
    }
}

export default App;
