import React from "react";

import Navbar  from "../navbar/Navbar";

export class QuickLinksPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: "quicklinks"
        };     
    }

    render() {
        return (
            <>
                <h2>QuickLinks!</h2>
                <Navbar currentPage={this.state.currentPage} />
            </>
        );
    }

}