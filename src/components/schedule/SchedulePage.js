import React from "react";

import Navbar  from "../navbar/Navbar";

export class SchedulePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: "schedule"
        };     
    }

    render() {
        return (
            <>
                <h2>schedule!</h2>
                <Navbar currentPage={this.state.currentPage} />
            </>
        );
    }

}