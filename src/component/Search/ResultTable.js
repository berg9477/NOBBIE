import React from 'react';
import "../../styles/search-style.css";
import axios from "axios";
import NameResults from "./NameResults";
class ResultTable extends React.Component {
    constructor() {
        super()
        this.state = {
            toggleLoading: false,
            allUsage: [],
            allRelated: [],
            clickedName: ""
        }
        this.handleResultClicked = this.handleResultClicked.bind(this);
        this.renderTableData = this.renderTableData.bind(this);
    }

    handleResultClicked = async (name) => {
        this.props.showSpecifics(false)
        this.setState({clickedName:name})
        this.setState({allUsage:[]})
        this.setState({allRelated:[]})
        this.setState({toggleLoading:true});
        try {
            const usageUrl = 'https://www.behindthename.com/api/lookup.json?name=' + name + '&key=sa583307807';
            const relatedUrl = 'https://www.behindthename.com/api/related.json?name=' + name + '&key=sa583307807';
            axios.all([
                await axios.get(usageUrl).then((usage) => {
                    if (usage.data.error === undefined) {
                        usage.data.forEach(item => {
                            this.setState({allUsage: item})
                        })
                    }
                }),
                await axios.get(relatedUrl).then((related) => {
                    this.setState({allRelated: related.data.names})
                })
            ])
            this.setState({toggleLoading: false});
            this.props.showSpecifics(true);
        }catch(error) {
            console.error(error);
        }
    };

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


    render() {
        return (
            <div>
                <table key="babyNames" id="babyNames">
                    <tbody>
                    {this.props.result.length !== 0 &&
                    <tr><th>Name</th><th>Gender</th><th>Top 2019</th></tr>}
                    {this.renderTableData()}
                    </tbody>
                </table>
                {this.state.toggleLoading === true && <p>loading...</p>}
                {(this.props.showName) &&
                <NameResults
                    name={this.state.clickedName}
                    allUsage={this.state.allUsage}
                    allRelated={this.state.allRelated}
                    isLoggedIn={this.props.isLoggedIn}
                    userData={this.props.userData}
                    />
                }
            </div>

        )
    }
}
export default ResultTable;
