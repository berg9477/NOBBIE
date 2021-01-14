import React from 'react';
import MainScreen from "./component/Search/MainScreen";
import './styles/App.css';
import Login from "./component/Login/Login";
import Header from "./component/Header";
import Footer from "./component/Footer";


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
        const overflow = value ? "hidden" : "auto";
        this.setState({displayInlog: value})
        document.body.style.overflow = overflow;
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
                    isLoggedIn={this.state.isLoggedIn}
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
                <Footer/>
            </div>
        );
    }
}

export default App;
