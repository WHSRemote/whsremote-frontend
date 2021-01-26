import React from "react";
import Navbar  from "../navbar/Navbar";
import loadingGif from "../../images/loading.gif";
import { Card, Row, Col } from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";
import { APIService } from '../../services/APIService';

class LunchMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            lunchArr: [],
        };     

        this.displayMenu = this.displayMenu.bind(this);
    }

    componentDidMount() {
        this.setState({loading: true});

        let _this = this;
        (async function () {
            APIService.getLunchMenu((arr => {
                _this.setState({
                    lunchArr: arr,
                    loading: false
                });
            }));
        })();
    }

    displayMenu(arr) {
        let menu = [];
        arr.forEach(ele => {
            menu.push(
                <span>{ele}</span>  
            );
        });
        return menu;
    }

    render() {
        return (
            <>
            <Card className="mt-3 mt-sm-0">
                <Card.Header as="h4" className="flex text-left align-items-center">
                    <div className="flex-1">
                        Lunch Menu
                    </div>
                    <div>
                        <a class="btn btn-info h5 m-0 btn-sm" href="https://docs.google.com/forms/d/e/1FAIpQLSd92KAP0xtEmPgVye_v4Q_5u_yyow-cKCBRdkFQo84GKa9OPw/viewform" target="_blank">Order Lunch</a>
                    </div>
                </Card.Header>
                <Card.Body className="p-1">
                    <Card.Text className="p-2" style={{position: "relative"}}>
                        {
                            (this.state.loading || this.state.lunchArr.length == 0) ? (<img src={loadingGif} className="loading-gif"/>) :
                            <Row>
                                <Col className="p-1 flex-col text-center border-right border-dark">
                                    <b>Today's Lunch:</b>
                                    {
                                        this.displayMenu(this.state.lunchArr[0])
                                    }
                                </Col>
                                <Col className="p-1 flex-col text-center">
                                    <b>Tomorrow's Lunch:</b>
                                    {
                                        this.displayMenu(this.state.lunchArr[1])
                                    }
                                </Col>
                            </Row>
                        }
                    </Card.Text>
                </Card.Body>
            </Card> 
            </>
        );
    }

}

export default LunchMenu;