import React from 'react';
import InputField from "../component/input/InputField";
import firebs from "../data/firebaseConfig";
import ResultTable from "../component/Search/results/ResultTable";
import ABCLists from "../component/Search/ABCLists";
import GenderSelect from "../component/input/GenderSelect";
import Alphabetical from "../component/Search/Alphabetical";
import Intro from "../component/Intro";
import rainbow from "../IMG/rainbow.png"
import "../styles/search-style.css";


class Home extends React.Component
{
    constructor() {
        super()
        this.state = {
            fstABC: [],
            lstABC: [],
            searchResult: [],
            loading: false,
            noResult: false,
            display: false,
            filterText: "More filters",
        }

        this.handleClickCheck = this.handleClickCheck.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.setSearchResult = this.setSearchResult.bind(this);
        this.setLoading = this.setLoading.bind(this);
        this.addToSearchResult = this.addToSearchResult.bind(this);
        this.openSpecificSearch = this.openSpecificSearch.bind(this);
    }

    /*Function is triggered when one of the characters cannot start with or cannot end with is clicked
    this saves or removes the specific character to a list (fstABC or lstABC) and is used for filtering the results when search is triggered*/
    handleClickCheck (id, label, list) {
        /*get checkBox id value*/
        const checkBox = document.getElementById(id);
        /*adding character to list*/
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
        /*removing character from list*/
        if (checkBox.checked === false) {
            if (list === "fstABC") {
                const array = [...this.state.fstABC];
                const index = array.indexOf(label)
                if (index !== -1) {
                    array.splice(index, 1);
                    this.setState({fstABC: array});
                }
            } else {
                const array = [...this.state.lstABC];
                const index = array.indexOf(label)
                if (index !== -1) {
                    array.splice(index, 1);
                    this.setState({lstABC: array});
                }
            }
        }
    }

    /*function is triggered for every name in database response in fetchData function*/
    addToSearchResult = (data) => {
             /*filter firstnames that start with search but not start with given characters from ABC list "can not start with"*/
        const startsWithAny = (prefixes, str) => {
            return prefixes.some(function (prefix) {
                return str.startsWith(prefix);
            });
        }
        /*filter firstnames that start with search but not end with given characters from ABC list "can not end with"*/
        const endsWithAny = (suffixes, str) => {
            return suffixes.some(function (suffix) {
                return str.endsWith(suffix);
            });
        }
        /*get search options */
        const searchItem = document.getElementById('nameSearch').value.toLowerCase();
        const getGender = document.getElementById('gender');
        const searchGender = !!getGender ? getGender.value : "";
        let resName = data.firstname;
        let listNr = data.listingNr.toString();
        /*all results that dont have a top 500 place are set to 999 in the database and need to be manually set to empty*/
        listNr = listNr === "999" ? "" : listNr;
        let res = [resName, data.gender, listNr];
        let indexFound = resName.indexOf(searchItem);
        let indexIsLast = endsWithAny(this.state.lstABC, resName);
        let indexIsFirst = startsWithAny(this.state.fstABC, resName);
        /*final check on gender, if name is found and if name is not starting or ending with character that is not allowed*/
        if ((!searchGender || searchGender === data.gender)
            && indexFound >= 0
            && indexIsFirst === false
            && indexIsLast === false) {
            /*write results to searchResult list*/
            this.setState(prevState => ({
                searchResult: [...prevState.searchResult, res]
            }))
            this.setState({loading: false})
            /*Check if there are any search results to show*/
            if(this.state.searchResult.length === 0){
                this.setState({noResult:true})
            } else {
                this.setState({noResult:false})
            }
        /*also check search results length here else it would be skipped and user would not see any message*/
        } else if (this.state.searchResult.length === 0){
            this.setState({noResult:true})
            this.setState({loading:false})
        }
    }

    /*Triggered when Get names button is clicked or enter is pressed
    makes connection to firebase database for retrieving names*/
    fetchData() {
        /*set states back to default value*/
        this.setState({noResult:false})
        this.setState({searchResult:[]})

        const searchItem = document.getElementById('nameSearch').value.toLowerCase();
        /*a connection is only made if the user enters a value*/
        if(searchItem !== null && searchItem !== '' && searchItem !== undefined) {
            /*set searchPanel disabled then search is being performed*/
            document.getElementById("searchPanel").disabled = true;
            this.setState({loading:true})
            const db = firebs.database();
            const listOfNames = db.ref('BabyNames');

            const query = listOfNames
                .orderByChild('firstname')
                /*endAt is set so not all results are retrieved from database for performance and filtering purposes*/
                .endAt(searchItem + "\uf8ff");

            query.on("value", (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    const data = childSnapshot.val();
                    /*triggers the upper function addToSearchResult*/
                    this.addToSearchResult(data)
                })
            })
        } else {
            /*If no value is entered noResult it set to true*/
            this.setState({noResult:true})
        }
    }

    setSearchResult (res) {
        this.setState({searchResult:res})
    }

    setLoading (value) {
        this.setState({loading:value})
    }

    /*function for show Less filters / more filters triangle */
    openSpecificSearch () {
        const val = this.state.display !== true
        const val2 = val === true ? "Less filters" : "More filters"
        this.setState({display: val})
        this.setState({filterText:val2})
    }

    /*function to make Enter-key also a valid trigger for starting search*/
    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.fetchData()
        }
    }

    render()
    {
        return (
            <div className="mainScreen">
                <div className="mainWrapper" onKeyPress={(event) => this.handleKeyDown(event)}>
                    <Intro/>
                    {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
                    <div id="searchPanel">

                        {/*Alphabet list to directly search all names starting with character that is clicked */}
                        <Alphabetical
                            addToSearchResult={this.addToSearchResult}
                            setSearchResult={this.setSearchResult}
                            setLoading={this.setLoading}
                        />
                        {/*input search panel*/}
                        <h3>Search on a specific name/part of name</h3>
                        <InputField
                            id='nameSearch'
                            label='Type in your search...'
                        />

                        {/*hides and shows extra filter options*/}
                        <div className="filtersWrapper">
                            <input type="checkbox" id="filters" onClick={()=>this.openSpecificSearch()}/>
                            <label className="filterControl" htmlFor="filters">{this.state.filterText}</label>
                        </div>
                        {this.state.display === true &&
                        <div className="specificSearch">
                            <GenderSelect/>
                            <br/>
                            <ABCLists
                                handleClickCheck={this.handleClickCheck}
                            />
                        </div>}

                        {/*button to start search*/}
                            <button type="button" onClick={()=>this.fetchData()}>
                                Get names
                            </button>

                    </div>
                </div>
                {/*message shown when waiting*/}
                    {this.state.loading && <h2>Loading... <img alt='rainbow' height='30px' src={rainbow}/></h2>}

                {/*message shown when no results are found or empty input is given*/}
                    {this.state.noResult === true && <p>No result to display. Please try to specify your search more precisely.</p>}

                {/*Shows results in table when retrieved successful*/}
                    <ResultTable
                        setLoading={this.setLoading}
                        result={this.state.searchResult}
                        isLoggedIn={this.props.isLoggedIn}
                        userData={this.props.userData}
                    />
            </div>
        );
    }
}

export default Home;
