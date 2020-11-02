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

    renderUsageData () {
        return this.props.allUsage.usages.map((item, index) => {
            let gen;
            if(item.usage_gender === 'f'){
                gen = 'females';
            } else{
                gen = 'males'
            }
            return (
                <p key={index}>the {item.usage_full} use it for {gen}</p>
            )
        })
    }
    renderGenderData (gen) {
        let gender;
        if(gen === 'f'){
            gender = 'This name is only used for naming women'
        }
        else if(gen === 'm'){
            gender = 'This name is only used for naming men'
        }
        else{ //gender can also be mf or fm
            gender = 'This name is used for both men and women'
        }
            return gender
    }

    renderRelatedData () {
        return this.props.allRelated.map((item, index) => {
            return (
                <p key={index}>{item}</p>
            )
        })
    }
    render() {
        const title = this.props.isLoggedIn === true ? this.props.name + " "+this.props.userData.Lastname : this.props.name
        return (
            <div>
                <h1>{title}</h1>
                {this.props.isLoggedIn === true &&
                <LikeName
                    userData = {this.props.userData}
                    nameToAdd = {this.props.name}
                />}
                {this.props.allUsage.gender !== undefined &&
                <div>

                    <h2>{this.renderGenderData(this.props.allUsage.gender)}</h2>
                    {this.renderUsageData()}
                    {this.props.allRelated.length > 0 &&
                    <div>This name is related to the following other names:{this.renderRelatedData()}</div>}
                </div>}
                {this.props.allUsage.length === 0 &&
                <p>This is a very unique name, there is no additional information to view</p>}

            </div>
        )
    }
}
export default NameResults;