import React from "react";
import { Table, Form } from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";
import { APIService } from "../../../services/APIService";
import { Loading } from "../../loading/Loading";

class ScheduleSettings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            schedule: {
                1: [], // Monday
                2: [], // Tuesday
                4: [], // Thursday
                5: []  // Friday
            }
        }

        this.submitSchedule = this.submitSchedule.bind(this);
        this.changeScheduleData = this.changeScheduleData.bind(this);
    }

    componentDidMount() {
        if(this.props.scheduleSettings != null && Object.keys(this.props.scheduleSettings).length > 0) {
            this.setState({
                schedule: this.props.scheduleSettings
            })
        }
    }

    submitSchedule(event) {
        event.preventDefault();
        if(!window.confirm('Are you sure your schedule is correct before submitting?')) {
            return;
        }
        
        let user_id = this.props.auth0.user.sub;

        let scheduleData = {
            userId: user_id,
            json: JSON.stringify(this.state.schedule)
        };
        console.log(scheduleData);
        // console.log(form.elements["period" + "1" + "-class"].value);
        
        let _this = this;
        _this.setState({loading: true});
        (async function () {
            let token = await _this.props.auth0.getAccessTokenSilently();
            APIService.postSchedule(token, scheduleData, (response => {
                console.log("POST CLASSES: " + JSON.stringify(response));
                _this.setState({loading: false});
            }));
        })();
    }

    changeScheduleData(day, periodSlot, classId, propagate){
        let scheduleCopy = this.state.schedule;
        // change current day slot period
        if (propagate) {
            scheduleCopy[day + 3][periodSlot] = classId;
            // change the other day's (day + 3) period slot )
        }
        scheduleCopy[day][periodSlot] = classId;
        // let currentClassList = this.state.classList;
        this.setState({
            schedule: scheduleCopy
        });
        console.log(JSON.stringify(this.state.schedule));
    }

    getClassesWithPeriod(period) {
        // console.log("Classes: " + JSON.stringify(this.props.classes));
        let classesWithPeriod = [<option value=""></option>];
        for (let [id, classObj] of Object.entries(this.props.classes)) {
            if (classObj.period === period) {
                classesWithPeriod.push(
                    <option value={id}>{classObj.class}</option>
                );
            } 
        }
        return classesWithPeriod;
    }

    render() {
        // let scheduleConfigDOM = [];
        // for (let [id, classObj] of Object.entries(this.state.classList)) {
        //     classConfigDOM.push(
        //         <ClassConfig id={id} classSettings={classObj} changeClassData={this.changeClassData}/>
        //     );
        // }
        return (
            <>
            <Form onSubmit={this.submitSchedule}>
                <Table responsive bordered className="text-center">
                    <thead>
                        <tr>
                            <th>Monday</th>
                            <th>Tuesday</th>
                            <th>Thursday</th>
                            <th>Friday</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td><Form.Control as="select" value={this.state.schedule[1][0]} onChange={(e) => { this.changeScheduleData(1, 0, e.target.value, true) }} className="border-primary text-primary"> {this.getClassesWithPeriod(1)}</Form.Control></td>
                            <td><Form.Control as="select" value={this.state.schedule[2][0]} onChange={(e) => { this.changeScheduleData(2, 0, e.target.value, true) }} className="border-primary text-primary"> {this.getClassesWithPeriod(2)}</Form.Control></td>
                            <td><Form.Control as="select" value={this.state.schedule[4][0]} onChange={(e) => { this.changeScheduleData(4, 0, e.target.value, false) }} > {this.getClassesWithPeriod(1)}</Form.Control></td>
                            <td><Form.Control as="select" value={this.state.schedule[5][0]} onChange={(e) => { this.changeScheduleData(5, 0, e.target.value, false) }} > {this.getClassesWithPeriod(2)}</Form.Control></td>
                        </tr>
                        <tr>
                            <td><Form.Control as="select" value={this.state.schedule[1][1]} onChange={(e) => { this.changeScheduleData(1, 1, e.target.value, true) }} className="border-primary text-primary"> {this.getClassesWithPeriod(3)}</Form.Control></td>
                            <td><Form.Control as="select" value={this.state.schedule[2][1]} onChange={(e) => { this.changeScheduleData(2, 1, e.target.value, true) }} className="border-primary text-primary"> {this.getClassesWithPeriod(4)}</Form.Control></td>
                            <td><Form.Control as="select" value={this.state.schedule[4][1]} onChange={(e) => { this.changeScheduleData(4, 1, e.target.value, false) }} > {this.getClassesWithPeriod(3)}</Form.Control></td>
                            <td><Form.Control as="select" value={this.state.schedule[5][1]} onChange={(e) => { this.changeScheduleData(5, 1, e.target.value, false) }} > {this.getClassesWithPeriod(4)}</Form.Control></td>
                        </tr>
                        <tr>
                            <td><Form.Control as="select" value={this.state.schedule[1][2]} onChange={(e) => { this.changeScheduleData(1, 2, e.target.value, true) }} className="border-primary text-primary"> {this.getClassesWithPeriod(5)}</Form.Control></td>
                            <td><Form.Control as="select" value={this.state.schedule[2][2]} onChange={(e) => { this.changeScheduleData(2, 2, e.target.value, true) }} className="border-primary text-primary"> {this.getClassesWithPeriod(6)}</Form.Control></td>
                            <td><Form.Control as="select" value={this.state.schedule[4][2]} onChange={(e) => { this.changeScheduleData(4, 2, e.target.value, false) }} > {this.getClassesWithPeriod(5)}</Form.Control></td>
                            <td><Form.Control as="select" value={this.state.schedule[5][2]} onChange={(e) => { this.changeScheduleData(5, 2, e.target.value, false) }} > {this.getClassesWithPeriod(6)}</Form.Control></td>
                        </tr>
                        <tr>
                            <td><Form.Control as="select" value={this.state.schedule[1][3]} onChange={(e) => { this.changeScheduleData(1, 3, e.target.value, true) }} className="border-primary text-primary"> {this.getClassesWithPeriod(7)}</Form.Control></td>
                            <td><Form.Control as="select" value={this.state.schedule[2][3]} onChange={(e) => { this.changeScheduleData(2, 3, e.target.value, true) }} className="border-primary text-primary" > {this.getClassesWithPeriod(8)}</Form.Control></td>
                            <td><Form.Control as="select" value={this.state.schedule[4][3]} onChange={(e) => { this.changeScheduleData(4, 3, e.target.value, false) }} > {this.getClassesWithPeriod(7)}</Form.Control></td>
                            <td><Form.Control as="select" value={this.state.schedule[5][3]} onChange={(e) => { this.changeScheduleData(5, 3, e.target.value, false) }} > {this.getClassesWithPeriod(8)}</Form.Control></td>
                        </tr>
                    </tbody>
                </Table>
                <button className="center mt-3" type="submit">Save Schedule</button>
            </Form>
            </>
        );
    }
}

export default withAuth0(ScheduleSettings);
