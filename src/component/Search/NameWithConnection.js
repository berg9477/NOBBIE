import React from "react";
import feest from "../../IMG/feest.png"


class NameWithConnection extends React.Component
{
    constructor() {
        super()
        this.state = {}
    }

    render() {
        return (
            <div>
                <img width="50px" alt="party" src={feest}/>
                You and {this.props.connection} both liked {this.props.name}
            </div>
        )
    }
}
export default NameWithConnection;