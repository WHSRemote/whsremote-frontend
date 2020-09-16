import React from "react";
import logo from '../../images/WHSRemote.png';
import bg from "../../images/bg.jpg";
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
            width: "100px",
            // width: "300px",
            textAlign: "center",
            padding: "0",
            borderRadius: "20em",
            backgroundColor: "#FF9700"
        };

        return (
            <>
            <div className="h-100 flex flex-col flex-center">
                <div className="login-bg"><div className="dark-bg"></div></div>
                <div className="login-card">
                    <img src={logo} className="logo center" alt="WHSRemote Logo" style={{width: "10em"}}/>
                    <div className="m-3">
                        <h3 className="text-center"><b>WHSRemote</b></h3>
                        <p className="text-muted text-center">A tool to help all of us navigate remote learning.</p>
                    </div>
                        
                    <div className="flex flex-center mb-3">
                        <button style={loginBtnStyle} onClick={() => {this.redirectAuth()}}>Login</button>
                    </div>
                    <div className="flex flex-center text-center">
                        <a className="w-100 text-muted" href="https://donorbox.org/whsremote-donation" target="_blank">Donate Here!</a>
                    </div>

                </div>
                
                {/* <div className="flex flex-col">
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
                        <Col className="flex flex-col mt-3 text-left">
                            <h3><b>IMPORTANT UPDATES:</b></h3>
                            <ul>
                                <li>Advisory support has been implemented! Select Advisory as a period for ONE class.</li>
                                <li>Periods are now shown on each class!</li>
                                <li>This crappy login page will be overhauled soon...</li>
                            </ul>
                        </Col>
                    </Row>
                    <div className="flex flex-center text-center">
                        <a className="w-100" href="https://donorbox.org/whsremote-donation" target="_blank">If you like this, help support me and cover costs here!</a>
                    </div>
                    
                </div> */}
                <div className="links-footer">
                    <a href="/policies">Privacy Policy</a><span>&nbsp;&nbsp;|&nbsp;&nbsp;</span><a href="#">About</a>
                </div>
            </div>
            </>
        );
    }

}

export default withRouter(withAuth0(LoginPage));