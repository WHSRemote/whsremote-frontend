import React from "react";

import Navbar  from "../navbar/Navbar";
import { Accordion, Card, Form, Col } from "react-bootstrap";
import ClassSettings from "./classes/ClassSettings";

export class SettingsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: "settings",
        };     

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(period, event) {
        this.setState({[period]: event.target.value}, () => {console.log(JSON.stringify(this.state))});
    }

    render() {
        return (
            <>
                <main>
                    <h2>Settings</h2>
                    <br />
                    <fieldset>
                        <legend>Classes</legend>
                        <small className="text-muted">It is highly advisable you complete all the fields all at once. As of now, fields will not save after you refresh.</small>
                        <ClassSettings />
                    </fieldset>
                </main>  
                <Navbar currentPage={this.state.currentPage} />
            </>
        );
    }

}