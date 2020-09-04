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
            width: "100px",
            textAlign: "center",
            padding: "0",
            borderRadius: "20em",
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
                    <div className="flex flex-center">
                        <button style={loginBtnStyle} onClick={() => {this.redirectAuth()}}>Login</button>
                    </div>
                </div>
                
            </section>
            </>
        );
    }

}

export default withRouter(withAuth0(LoginPage));