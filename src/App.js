import React from 'react';
import Search from "./component/Search/Search";
import './App.css';
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
