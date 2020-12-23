import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faLink, faHome, faBell, faCog,  } from '@fortawesome/free-solid-svg-icons';

class Navbar extends React.Component {
    
    changeRoute(route) {
        this.props.history.push(route);
    }

    render() {
        let navbarClass = "col menuitem ";
        return (
            <footer className="sticky bottom col p-0">
                <div className={navbarClass + (this.props.currentPage === "homework" ? "active" : "")} onClick={() => {this.changeRoute("/homework")}}>
                    <FontAwesomeIcon icon={faTasks} />
                </div>
    
                <div className={navbarClass + (this.props.currentPage === "quicklinks" ? "active" : "")} onClick={() => {this.changeRoute("/quicklinks")}}>
                    <FontAwesomeIcon icon={faLink} />
                </div>
    
                <div className={navbarClass + (this.props.currentPage === "home" ? "active" : "")} onClick={() => {this.changeRoute("/home")}}>
                    <FontAwesomeIcon icon={faHome} />
                </div>
    
                <div className={navbarClass + (this.props.currentPage === "schedule" ? "active" : "")} onClick={() => {this.changeRoute("/schedule")}}>
                    <FontAwesomeIcon icon={faBell} />
                </div>
    
                <div className={navbarClass + (this.props.currentPage === "settings" ? "active" : "")} onClick={() => {this.changeRoute("/settings")}}>
                    <FontAwesomeIcon icon={faCog} />
                </div>
            </footer>
        );
    }
}

export default withRouter(Navbar);

