import React from 'react';
import "../../../styles/results-style.css";
import axios from "axios";
import NameResults from "./NameResults";


class ResultTable extends React.Component {
    constructor() {
        super()
        this.state = {
            allUsage: [],
            allRelated: [],
            clickedName: "",
            displayNameClicked: false
        }
        this.handleResultClicked = this.handleResultClicked.bind(this);
        this.renderTableData = this.renderTableData.bind(this);
        this.handleCloseBTNClick = this.handleCloseBTNClick.bind(this);
    }

    /*Function is triggered when specific name is clicked
    it connects to the two rest api's for getting background information
    on the specific name*/
    handleResultClicked = async (name) => {
        /*set all state objects to default value*/
        this.setState({displayNameClicked:false})
        this.setState({clickedName:name})
        this.setState({allUsage:[]})
        this.setState({allRelated:[]})
        this.props.setLoading(true)
        try {
            /*value of key can be found in .env file, this is hidden for public use in netlify*/
            const key = process.env.REACT_APP_API_KEY
            const usageUrl = 'https://www.behindthename.com/api/lookup.json?name=' + name + '&key=' + key;
            const relatedUrl = 'https://www.behindthename.com/api/related.json?name=' + name + '&key=' + key;
            /*used axios.all so both rest api's can be run at in one call*/
            await axios.all([
                /*get results for the usages of a name*/
                await axios.get(usageUrl).then((usage) => {
                    /*if rest api has no results to give back the data.error will have a value, if not then results are valid*/
                    if (usage.data.error === undefined) {
                        usage.data.forEach(item => {
                            this.setState({allUsage: item})
                        })
                    }
                }),
                /*get results of related names of a name*/
                await axios.get(relatedUrl).then((related) => {
                    /*if rest api has no results to give back the data.error will have a value, if not then results are valid*/
                    if (related.data.error === undefined) {
                        this.setState({allRelated: related.data.names})
                    }
                })
            ])
            this.props.setLoading(false)
            this.setState({displayNameClicked:true})
            document.body.style.overflow = "hidden";

        }catch(error) {
            console.error(error);
        }
    };

    /*function renders the rows of the table of results*/
    renderTableData () {
        return this.props.result.map((item, index) => {
            let name = item[0][0].toUpperCase() + item[0].substring(1);
            return (
                <tr onClick={() => this.handleResultClicked(name)} key={index}>
                    <td>{name}</td>
                    <td>{item[1]}</td>
                    <td>{item[2]}</td>
                </tr>
            )
        })
    }

    /*function is triggered when the X is clicked in the result screen*/
    handleCloseBTNClick(value) {
        this.setState({displayNameClicked: value})
        document.body.style.overflow = "auto";
    }


    render() {
        return (
            <div className="resultWrapper">

                {/*set up table of results*/}
                <table key="babyNames" id="babyNames">
                    <tbody>
                    {this.props.result.length !== 0 &&
                    <tr><th>Name</th><th>Gender</th><th>Top 2019</th></tr>}
                    {this.renderTableData()}
                    </tbody>
                </table>

                {/*Shows screen with specific name info, is opened upon clicking on name in results table*/}
                {(this.state.displayNameClicked === true) &&
                <div className="PanelOverlay">
                    <div className="ModalPanel">
                        <span className="closeBTN" onClick={()=>this.handleCloseBTNClick(false)}>&times;</span>
                        <NameResults
                            name={this.state.clickedName}
                            allUsage={this.state.allUsage}
                            allRelated={this.state.allRelated}
                            isLoggedIn={this.props.isLoggedIn}
                            userData={this.props.userData}
                            />
                    </div>
                </div>
                }
            </div>

        )
    }
}
export default ResultTable;
