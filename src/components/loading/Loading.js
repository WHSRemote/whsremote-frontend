import React from "react";
import logo from '../../images/WHSRemote.png';

export class Loading extends React.Component {

    render() {
        return (
            <>
                <div className="loading-bg">
                    <img className="loading-logo" src={logo} alt="WHSRemote logo" />
                </div>
                
            </>
        );
    }

}