import React from "react";

import Navbar  from "../navbar/Navbar";
import { Loading } from "../loading/Loading";
import { withAuth0 } from "@auth0/auth0-react";
import { Table, Button, Row, Col } from "react-bootstrap"; 
import { APIService } from '../../services/APIService';
import { ScheduleService } from "../../services/ScheduleService";

class SchedulePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: "schedule",
            loading: false,
            classes: null,
            schedule: null,
        };     

        this.getClass = this.getClass.bind(this);
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
                    classes: classes   
                });

                APIService.getSchedule(token, user_id, (schedule => {
                    _this.setState({
                        schedule: schedule   
                    });
                    _this.setState({loading: false});

                    // APIService.getScheduleUpdate(token, (scheduleUpdate => {
                    //     _this.setState({
                    //         scheduleUpdate: scheduleUpdate
                    //     });

                    //     _this.setState({loading: false});

                    //     _this.setCurrentClass();
                    //     setInterval(_this.setCurrentClass.bind(_this), 5000);
                    // }));
                }));
            }));
        })();
    }

    getClass(classId) {
        if (classId === null || classId === "") return <small>Free!</small>;
        let classObj = this.state.classes[classId];
        if(classObj !== null) return (
            <>
                <p className="m-0"><b>{ classObj.class }</b></p>  
                <small>{ classObj.teacher}</small>
            </>
        );
        return <small>Free!</small>;
    }

    render() {
        return (
            (this.state.loading || this.state.classes == null || this.state.schedule == null) ? <Loading /> :
            <>
                <main>
                    <Row>
                        <Col>
                            <Button variant="outline-dark" size="sm" className="mt-1 mb-1" onClick={() => {window.print()}}>🖨️ Print</Button>
                        </Col>
                    </Row>
                    <Table responsive bordered className="text-center schedule-table table-sm section-to-print">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Monday</th>
                                <th>Tuesday</th>
                                <th>Thursday</th>
                                <th>Friday</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>8:35-8:40</td>
                                <td colspan="4"><small>Advisory</small></td>
                            </tr>
                            <tr>
                                <td>8:45-10:05</td>
                                <td>{this.getClass(this.state.schedule[1][0])}</td>
                                <td>{this.getClass(this.state.schedule[2][0])}</td>
                                <td>{this.getClass(this.state.schedule[4][0])}</td>
                                <td>{this.getClass(this.state.schedule[5][0])}</td>
                            </tr>
                            <tr>
                                <td>10:05-10:20</td>
                                <td colspan="4"><small>Screen Break</small></td>
                            </tr>
                            <tr>
                                <td>10:20-11:40</td>
                                <td>{this.getClass(this.state.schedule[1][1])}</td>
                                <td>{this.getClass(this.state.schedule[2][1])}</td>
                                <td>{this.getClass(this.state.schedule[4][1])}</td>
                                <td>{this.getClass(this.state.schedule[5][1])}</td>
                            </tr>
                            <tr>
                                <td>11:40-12:10</td>
                                <td colspan="4"><small>Lunch</small></td>
                            </tr>
                            <tr>
                                <td>12:10-1:30</td>
                                <td>{this.getClass(this.state.schedule[1][2])}</td>
                                <td>{this.getClass(this.state.schedule[2][2])}</td>
                                <td>{this.getClass(this.state.schedule[4][2])}</td>
                                <td>{this.getClass(this.state.schedule[5][2])}</td>
                            </tr>
                            <tr>
                                <td>1:30-1:45</td>
                                <td colspan="4"><small>Screen Break</small></td>
                            </tr>
                            <tr>
                                <td>1:45-3:05</td>
                                <td>{this.getClass(this.state.schedule[1][3])}</td>
                                <td>{this.getClass(this.state.schedule[2][3])}</td>
                                <td>{this.getClass(this.state.schedule[4][3])}</td>
                                <td>{this.getClass(this.state.schedule[5][3])}</td>
                            </tr>
                            
                        </tbody>
                    </Table>
                </main>
                <Navbar currentPage={this.state.currentPage} />
            </>
        );
    }

}

export default withAuth0(SchedulePage);