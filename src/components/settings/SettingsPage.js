import React from "react";

import Navbar  from "../navbar/Navbar";
import { Loading } from "../loading/Loading";
import { Accordion, Card, Form, Col } from "react-bootstrap";
import ClassSettings from "./classes/ClassSettings";
import ScheduleSettings from "./schedule/ScheduleSettings";
import { withAuth0 } from "@auth0/auth0-react";
import { APIService } from '../../services/APIService';

class SettingsPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: "settings",
            loading: false,
            currentClasses: null,
            currentSchedule: null
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

                APIService.getSchedule(token, user_id, (schedule => {
                    _this.setState({
                        currentSchedule: schedule   
                    });
                    _this.setState({loading: false});
                }));
                
            }));
        })();
    }

    render() {
        if(this.state.currentClasses === null || this.state.currentSchedule === null) return <Loading />;

        return (
            <>
                {(this.state.loading) ? <Loading /> : <></>}
                <main>
                    <h2>Settings</h2>
                    <a href="https://www.youtube.com/watch?v=SPeMsF_0WPY&list=PL5Y2tGfke7b720jp0GcGiOTQhT_SCItpA&index=3" target="_blank">Need help?</a>
                    <br />
                    <fieldset>
                        <legend>Classes</legend>
                        <p>Advisory support now added! Add a class and set its period to "Advisory".</p>
                        {/* <small className="text-muted">It is highly advisable you complete all the fields all at once. As of now, fields will not save after you refresh.</small> */}
                        <ClassSettings classSettings={this.state.currentClasses} />
                    </fieldset>
                    <fieldset>
                        <legend>Schedule</legend>
                        <a href="https://www.youtube.com/watch?v=SPeMsF_0WPY&list=PL5Y2tGfke7b720jp0GcGiOTQhT_SCItpA&index=3" target="_blank">Look at this video to make sure your schedule is configured correctly!</a>
                        <ScheduleSettings classes={this.state.currentClasses} scheduleSettings={this.state.currentSchedule} />
                    </fieldset>
                    <br />
                    <fieldset>
                        <legend>About / Feedback</legend>
                        <button className="btn-info" onClick={() => {window.open("https://forms.gle/ywYxtt37L3dMAKoq8", '_blank')}}>Feedback / Bug Report Form</button>
                        <br />
                        <br />
                        <span>Made with ☕ by Mingle Li, Class of 2021</span>
                        <br />
                        <a href="https://github.com/whsremote" target="_blank">Check out the code!</a>
                    </fieldset>
                </main>  
                <Navbar currentPage={this.state.currentPage} />
            </>
        );
    }

}

export default withAuth0(SettingsPage);