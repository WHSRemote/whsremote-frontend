import React from "react";

import Navbar  from "../navbar/Navbar";
import CurrentClass from "./CurrentClass";
import AllClasses from "./AllClasses";
import { Loading } from "../loading/Loading";
import { withAuth0 } from "@auth0/auth0-react";
import { Row, Col } from "react-bootstrap"; 
import { APIService } from '../../services/APIService';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: "home",
            loading: false,
            classes: [],
            schedule: [],
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
                _this.setState({loading: false});

                _this.setCurrentClass();
            }));
        })();
    }

    setCurrentClass() {
        // Set current class in the card based off what time it is
    }

    render() {
        return ( 
            <>
                {this.state.loading ? <Loading /> : <></>}
                <main>
                    <div className="col mb-3">
                        <div className="flex-1">
                            <h2>Hello, <b>{this.props.auth0.user.nickname}</b>!</h2>
                        </div>
                        <div className="flex-0">
                            <button onClick={() => {this.props.auth0.logout({ returnTo: window.location.origin })}}>Logout</button>
                        </div>
                    </div>
                    
                    <div className="col flex-col">
                        {this.state.classes.length > 0 ?
                            <>
                                <CurrentClass class={this.state.classes[0]}/>
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