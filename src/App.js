import React from 'react';
import Home from "./Pages/Home";
import Login from "./component/Login/Login";
import Header from "./component/Header";
import Footer from "./component/Footer";
import About from "./Pages/About";
import './styles/App.css';
import './styles/index.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component
{
    constructor() {
        super()
        this.state = {
            userData: [],
            isLoggedIn: false,
            displayLoggedIn: false
        }
        this.toggleIsLoggedIn = this.toggleIsLoggedIn.bind(this)
        this.updateUserData = this.updateUserData.bind(this)
        this.handleLoginClick = this.handleLoginClick.bind(this);
    }

    /*Function is triggered when login button or Join Nobbie banner is clicked,
    this will make the login screen visible*/
    handleLoginClick(value) {
        const overflow = value ? "hidden" : "auto";
        this.setState({displayLoggedIn: value})
        document.body.style.overflow = overflow;
    }

    /* value kan be true or false*/
    toggleIsLoggedIn(value) {
        this.setState({isLoggedIn:value});
    }

    /*value set to state userData object*/
    updateUserData(value) {
        this.setState({userData:value})
    }
    render()
    {
        return (
            <Router>
                <div className="App">
                    <Header
                        handleLoginClick = {this.handleLoginClick}
                        isLoggedIn={this.state.isLoggedIn}
                    />
                    {this.state.displayLoggedIn === true &&
                    <Login
                        handleLoginClick= {this.handleLoginClick}
                        toggleIsLoggedIn={this.toggleIsLoggedIn}
                        updateUserData={this.updateUserData}
                        userData={this.state.userData}
                        isLoggedIn={this.state.isLoggedIn}
                    />}
                    {/*Switch and Route used for navigation to Home or About page*/}
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
