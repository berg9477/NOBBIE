import React from "react";
import LikeName from "./LikeName";

class NameResults extends React.Component
{
    constructor() {
        super()
        this.state = {
        }
        this.renderUsageData = this.renderUsageData.bind(this)
        this.renderGenderData = this.renderGenderData.bind(this)
        this.renderRelatedData = this.renderRelatedData.bind(this)
    }

    /*Function to set format to results of usages data for a name*/
    renderUsageData () {
        return this.props.allUsage.usages.map((item, index) => {
            let gen;
            if(item.usage_gender === 'f'){
                gen = 'females';
            } else{
                gen = 'males'
            }
            return (
                <div key={index}>the {item.usage_full} use it for {gen}</div>
            )
        })
    }

    /*Function to set message about the gender*/
    renderGenderData (gen) {
        let gender;
        if(gen === 'f'){
            gender = 'This name is only used for naming women'
        }
        else if(gen === 'm'){
            gender = 'This name is only used for naming men'
        }
        else{ /*Gender can also be mf or fm*/
            gender = 'This name is used for both men and women'
        }
            return gender
    }

    /*Function to format the results of related names data*/
    renderRelatedData () {
        return this.props.allRelated.map((item, index) => {
            return (
                <p key={index}>{item}</p>
            )
        })
    }
    render() {
        /*when user is logged in the selected firstname is shown with the user's lastname else the title will only be the selected firstname*/
        const title = this.props.isLoggedIn === true ? this.props.name + " "+this.props.userData.Lastname : this.props.name
        return (
            <div>
                <h1>{title}</h1>

                {/*when user is logged in the option for saving a name is shown*/}
                {this.props.isLoggedIn === true &&
                <LikeName
                    userData = {this.props.userData}
                    nameToAdd = {this.props.name}
                />}

                {/*when gender is not undefined results are shown*/}
                {this.props.allUsage.gender !== undefined &&
                <div>
                    <p>{this.renderGenderData(this.props.allUsage.gender)}</p>
                    <div className="dottedRowHorz"> </div>
                    <div>{this.renderUsageData()}</div>
                    <div className="dottedRowHorz"> </div>
                    {/*shows related names when allRelated list is at least 1*/}
                    {this.props.allRelated.length > 0 &&
                    <div>This name is related to the following other names:{this.renderRelatedData()}</div>}
                </div>}

                {/*when there is no result to show for the name, the below message is shown*/}
                {this.props.allUsage.length === 0 &&
                <p>This is a very unique name, there is no additional information to view</p>}
            </div>
        )
    }
}
export default NameResults;
