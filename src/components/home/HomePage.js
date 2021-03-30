import React from "react";
import {Helmet} from "react-helmet";
import AdSense from 'react-adsense';
import Navbar  from "../navbar/Navbar";
import CurrentClass from "./CurrentClass";
import AllClasses from "./AllClasses";
import LunchMenu from "./LunchMenu";
import { Loading } from "../loading/Loading";
import { withAuth0 } from "@auth0/auth0-react";
import { Row, Col } from "react-bootstrap"; 
import { APIService } from '../../services/APIService';
import { ScheduleService } from "../../services/ScheduleService";
import C from "../../constants/Constants";


class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: "home",
            loading: false,
            classes: {},
            schedule: [],
            scheduleUpdate: {},
            currentClass: {},
            periodDuration: {}
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
                    classes: classes   
                });

                APIService.getSchedule(token, user_id, (schedule => {
                    _this.setState({
                        schedule: schedule   
                    });

                    APIService.getScheduleUpdate(token, (scheduleUpdate => {
                        _this.setState({
                            scheduleUpdate: scheduleUpdate
                        });

                        _this.setState({loading: false});

                        _this.setCurrentClass();
                        setInterval(_this.setCurrentClass.bind(_this), 5000);
                    }));
                }));
            }));
        })();
    }

    setCurrentClass() {
        // Set current class in the card based off what time it is
        let [currentClass, periodStart, periodEnd] = ScheduleService.getCurrentPeriod(this.state.schedule, this.state.scheduleUpdate);
        
        if (typeof currentClass === "string") {
            // a class id
            this.setState({
                currentClass: this.state.classes[currentClass],
            })
        } else if (typeof currentClass === "number") {
            if (currentClass == C.PERIOD_ADVISORY || currentClass == C.PERIOD_EXTADVISORY) {
                for (let [key, value] of Object.entries(this.state.classes)) {
                    if (value.period == -1) {
                        currentClass = value;
                    }
                }
            }
            this.setState({
                currentClass: currentClass,
            });
        }

        this.setState({
            periodDuration: {
                start: periodStart,
                end: periodEnd
            }
        });
    }

    render() {
        return ( 
            <>
                {this.state.loading ? <Loading /> : <></>}
                <main>
                    {/* <Helmet>
                        <script data-ad-client="ca-pub-9570422466887989" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                            
                    </Helmet>
                    <AdSense.Google
                        client='ca-pub-9570422466887989'
                        slot='7696667201'
                        style={{ display: 'block' }}
                        format='auto'
                        responsive='true'
                    /> */}
                    <div className="col mb-3">
                        <div className="flex-1">
                            <h2>Hello, <b>{this.props.auth0.user.nickname}</b>!</h2>
                        </div>
                        <div className="flex-0">
                            <button onClick={() => {this.props.auth0.logout({ returnTo: window.location.origin })}}>Logout</button>
                        </div>
                    </div>

                    <Col xs={12}>
                        <div className="alert alert-danger w-100 text-center" role="alert">
                            3/30: I'm sorry! I screwed up accidentally. It'll be fixed at 12:30pm.
                        </div>
                    </Col>
                    
                    <div className="col flex-col">
                        {Object.keys(this.state.classes).length > 0 ?
                            <>
                                <Row>
                                    <Col xs={12} sm={8} className="flex-col"><CurrentClass class={this.state.currentClass} periodDuration={this.state.periodDuration}/></Col>
                                    <Col xs={12} sm={4} className=""><LunchMenu/></Col>
                                </Row>
                                
                                <hr/>
                                <Row>
                                    <AllClasses classes={this.state.classes}/>
                                </Row>
                            </>
                        :
                            <h3>You currently have no classes configured. Go to Settings and fill in your periods!</h3>
                        }
                    </div>
                </main>
                
                <Navbar currentPage={this.state.currentPage} />
            </>
        );
    }

}

export default withAuth0(HomePage);
