import React from 'react';
import Text from "../input/Text";
import firebs from "../../data/firebaseConfig";
import ResultTable from "./ResultTable";
import ABCLists from "./ABCLists";
import GenderSelect from "../input/GenderSelect";
import Alphabetical from "./Alphabetical";

class Search extends React.Component
{
    constructor() {
        super()
        this.state = {
            fstABC: [],
            lstABC: [],
            searchResult: [],
            loading: false,
            showNameSpecifics: false,
            noResult: false
        }
        this.handleClickCheck = this.handleClickCheck.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.setShowNameSpecifics = this.setShowNameSpecifics.bind(this);
        this.setSearchResult = this.setSearchResult.bind(this)
        this.setLoading = this.setLoading.bind(this)
        this.addToSearchResult = this.addToSearchResult.bind(this);
    }

    handleClickCheck (id, label, list) {
        const checkBox = document.getElementById(id);
        if (checkBox.checked === true) {
            if (list === "fstABC") {
                this.setState(prevState => ({
                    fstABC: [...prevState.fstABC, label]
                }));
            } else {
                this.setState(prevState => ({
                    lstABC: [...prevState.lstABC, label]
                }));
            }
        }
    }

    addToSearchResult = (data) => {
        const startsWithAny = (prefixes, str) => {
            return prefixes.some(function (prefix) {
                return str.startsWith(prefix);
            });
        }
        const endsWithAny = (suffixes, str) => {
            return suffixes.some(function (suffix) {
                return str.endsWith(suffix);
            });
        }
        const searchItem = document.getElementById('nameSearch').value.toLowerCase();
        const searchGender = document.getElementById('gender').value;

        let resName = data.firstname;
        let listNr = data.listingNr.toString();
        listNr = listNr === "999" ? "" : listNr;
        let res = [resName, data.gender, listNr];
        let indexFound = resName.indexOf(searchItem);
        let indexIsLast = endsWithAny(this.state.lstABC, resName);
        let indexIsFirst = startsWithAny(this.state.fstABC, resName);
        if ((!searchGender || searchGender === data.gender)
        && indexFound >= 0
        && indexIsFirst === false
        && indexIsLast === false) {
            this.setState(prevState => ({
                searchResult: [...prevState.searchResult, res]
            }))
            this.setState({loading: false})
            if(this.state.searchResult.length === 0){
                this.setState({noResult:true})
                this.setState({loading:false})
            } else {
                this.setState({noResult:false})
            }
        } else if (this.state.searchResult.length === 0){
            this.setState({noResult:true})
            this.setState({loading:false})
        }
    }

    fetchData() {
        this.setState({noResult:false})
        this.setState({searchResult:[]})

        const searchItem = document.getElementById('nameSearch').value.toLowerCase();
        if(searchItem !== null && searchItem !== '' && searchItem !== undefined) {
            this.setState({loading:true})
            const db = firebs.database();
            const listOfNames = db.ref('BabyNames');

            const query = listOfNames
                .orderByChild('firstname')
                .endAt(searchItem + "\uf8ff");

            query.on("value", (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    const data = childSnapshot.val();
                    this.addToSearchResult(data)
                })
            })

        } else {
            this.setState({noResult:true})
        }

    }
    setShowNameSpecifics(value) {
        this.setState({showNameSpecifics: value})
    }

    setSearchResult (res) {
        this.setState({searchResult:res})
    }

    setLoading (value) {
        this.setState({loading:value})
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.fetchData()
            this.setShowNameSpecifics(false)
        }
    }

    render()
    {
        return (
            <div onKeyPress={(event) => this.handleKeyDown(event)}>
                <div className="searchPanel">
                    <Alphabetical
                        addToSearchResult={this.addToSearchResult}
                        setSearchResult={this.setSearchResult}
                        setLoading={this.setLoading}
                    />
                    <h3>Search on a specific name/part of name</h3>
                    <Text
                        id='nameSearch'
                        label='Type in your search...'
                    />
                    <GenderSelect/>
                    <ABCLists
                        handleClickCheck={this.handleClickCheck}
                    />
                    <p>
                        <button type="button" onClick={()=>this.fetchData()}>
                            Get names
                        </button></p>

                </div>

                {this.state.loading && <p>Loading....</p>}
                {this.state.noResult === true && <p>No result to display. Please try to specify your search more precisely.</p>}

                <ResultTable
                    result={this.state.searchResult}
                    showName={this.state.showNameSpecifics}
                    showSpecifics={this.setShowNameSpecifics}
                    isLoggedIn={this.props.isLoggedIn}
                    userData={this.props.userData}
                />
            </div>
        );
    }
}

export default Search;