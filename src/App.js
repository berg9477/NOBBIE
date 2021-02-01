import React from 'react';
import Home from "./Pages/Home";
import Login from "./component/Login/Login";
import Header from "./component/Header";
import Footer from "./component/Footer";
import About from "./Pages/About";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

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
            <Router>
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
                    <Switch>
                        <Route exact path="/">
                            <Home
                            userData={this.state.userData}
                            isLoggedIn={this.state.isLoggedIn}
                            />
                        </Route>
                        <Route path="/About">
                            <About/>
                        </Route>
                    </Switch>
                    <Footer/>
                </div>
            </Router>
        );
    }
}

export default App;
