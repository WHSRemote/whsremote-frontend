import React from "react";
import logo from '../../images/WHSRemote.png';
import { Row, Col } from "react-bootstrap";
import { withAuth0 } from "@auth0/auth0-react";
import { withRouter } from "react-router-dom";

class LoginPage extends React.Component {

    redirectAuth() {
        if(this.props.auth0.isAuthenticated) {
            this.props.history.push("/home")
        } else {
            this.props.auth0.loginWithRedirect();
        }
    }

    render() {
        let loginBtnStyle = {
            fontSize: "150%",
            height: "100px",
            // width: "100px",
            width: "300px",
            textAlign: "center",
            padding: "0",
            // borderRadius: "20em",
            backgroundColor: "#FF9700"
        };

        return (
            <>
            <section>
                <div className="flex flex-col">
                    <div className="flex flex-col">
                        <img src={logo} className="logo center" alt="WHSRemote Logo" style={{width: "10em"}}/>
                        <div className="m-3">
                            <h1 className="text-center"><b>WHSRemote</b></h1>
                            <h3 className="text-center">
                                A tool to help all of us navigate remote learning.
                            </h3>
                        </div>
                    </div>
                    <br/>
                    
                    <Row>
                        <Col className="flex flex-col">
                            <div className="flex flex-center">
                                <button style={loginBtnStyle} onClick={() => {this.redirectAuth()}}>Login</button>
                            </div>
                        </Col>
                        <Col className="text-left flex flex-col">
                            <h3><b>IMPORTANT UPDATES:</b></h3>
                            <ul>
                                <li>PLEASE CLICK "Need Help?" ON SETTINGS TO VERIFY THAT YOU FILLED IN YOUR SCHEDULE CORRECTLY</li>
                                <li>Advisory support has been implemented! Select Advisory as a period for ONE class.</li>
                            </ul>
                        </Col>
                    </Row>
                    <div className="flex flex-center text-center">
                        <a className="w-100" href="https://donorbox.org/whsremote-donation" target="_blank">If you like this, help support me and cover costs here!</a>
                    </div>
                    
                </div>
                
            </section>
            </>
        );
    }

}

export default withRouter(withAuth0(LoginPage));