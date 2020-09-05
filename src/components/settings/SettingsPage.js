import React from "react";

import Navbar  from "../navbar/Navbar";
import { Loading } from "../loading/Loading";
import { Accordion, Card, Form, Col } from "react-bootstrap";
import ClassSettings from "./classes/ClassSettings";
import { withAuth0 } from "@auth0/auth0-react";
import { APIService } from '../../services/APIService';

class SettingsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: "settings",
            loading: false,
            currentClasses: []
        };     
    }

    componentDidMount() {
        this.setState({loading: true});

        let user_id = this.props.auth0.user.sub;
        let _this = this;
        (async function () {
            let token = await _this.props.auth0.getAccessTokenSilently();
            APIService.getClasses(token, user_id, (classes => {
                console.log(classes);
                _this.setState({
                    currentClasses: classes   
                });
                _this.setState({loading: false});
            }));
        })();
    }

    render() {
        if(this.state.currentClasses.length === 0) return <Loading />;

        return (
            <>
                {(this.state.loading) ? <Loading /> : <></>}
                <main>
                    <h2>Settings</h2>
                    <br />
                    <fieldset>
                        <legend>Classes</legend>
                        {/* <small className="text-muted">It is highly advisable you complete all the fields all at once. As of now, fields will not save after you refresh.</small> */}
                        <ClassSettings classSettings={this.state.currentClasses} />
                    </fieldset>
                </main>  
                <Navbar currentPage={this.state.currentPage} />
            </>
        );
    }

}

export default withAuth0(SettingsPage);