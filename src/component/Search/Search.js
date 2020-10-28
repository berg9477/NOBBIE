import React from 'react';
import Text from "../input/Text";
import firebs from "../../data/firebaseConfig";
import ResultTable from "./ResultTable";
import ABCLists from "./ABCLists";

class Search extends React.Component
{
    constructor() {
        super()
        this.state = {
            fstABC: [],
            lstABC: [],
            searchResult: [],
            loading: false,
            showNameSpecifics: false
        }
        this.handleClickCheck = this.handleClickCheck.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.setShowNameSpecifics = this.setShowNameSpecifics.bind(this);

    }

    handleClickCheck (id, label, list) {
        const checkBox = document.getElementById(id);
        const fst = this.state.fstABC
        const lst = this.state.lstABC
        if (checkBox.checked === true) {
            if (list === "fstABC") {
                this.setState(prevState => ({
                    fstABC: [...prevState.fstABC, label]
                }));
                console.log(fst, id)
            } else {
                this.setState(prevState => ({
                    lstABC: [...prevState.lstABC, label]
                }));
                console.log(lst, id)
            }
        }
    }

    fetchData() {
        this.setState({searchResult:[]})
        this.setState({loading:true})
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
        if(searchItem !== null && searchItem !== '' && searchItem !== undefined) {
            const searchGender = document.getElementById('gender').value;
            const db = firebs.database();
            const listOfNames = db.ref('BabyNames');
            const fst = this.state.fstABC
            const lst = this.state.lstABC
            const query = listOfNames
                .orderByChild('firstname')
                .endAt(searchItem + "\uf8ff");

            query.on("value", (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    const date = childSnapshot.val();
                    addToSearchResult(date)
                })
            })
            const addToSearchResult = (data) => {
                let resName = data.firstname;
                let listNr = data.listingNr.toString();
                listNr = listNr === "999" ? "" : listNr;
                let res = [resName, data.gender, listNr];
                let indexFound = resName.indexOf(searchItem);
                let indexIsLast = endsWithAny(fst, resName);
                let indexIsFirst = startsWithAny(lst, resName);
                if ((!searchGender || searchGender === data.gender)
                    && indexFound >= 0
                    && indexIsFirst === false
                    && indexIsLast === false) {
                    this.setState(prevState => ({
                            searchResult: [...prevState.searchResult, res]
                        })
                    )
                    this.setState({loading: false})
                }
            }
        }
        else{
            console.log("niks ingevuld")
        }

    }
    setShowNameSpecifics(value) {
      this.setState({showNameSpecifics: value})
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
                <Text
                    id='nameSearch'
                    label='Type in your search'
                />
                Gender <select name="gender" id="gender">
                <option value="" defaultValue> </option>
                <option value="M">Male</option>
                <option value="V">Female</option>
                </select>
                <ABCLists
                handleClickCheck={this.handleClickCheck}
                />
                <button type="button" onClick={()=>this.fetchData()}>
                    Get names
                </button>
               {this.state.loading && <p>Loading....</p>}
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
