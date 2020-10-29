import React, { Component } from 'react';

class Steps extends Component {

    render() {
        return (
            <div className="row form-steps">
                <div className={"col-xs-3 " + (this.props.step > 0 ? 'active' : '')}>
                    <i className="fa fa-at" aria-hidden="true"></i><br/>Credentials</div>
                <div className={"col-xs-3 " + (this.props.step > 1 ? 'active' : '')}>
                    <i className="fa fa-unlock-alt" aria-hidden="true"></i><br/>Profile</div>
            </div>
        )
    }
}

export default Steps;
