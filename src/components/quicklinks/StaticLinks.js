import React from "react";
import { Row, Col, Card } from "react-bootstrap";

export default class StaticLinks extends React.Component {

    openLink(link) {
        window.open(
            link,
            '_blank' // <- This is what makes it open in a new window.
          );
    }
    
    render() {
        return <>
            <Row>
                <Col className="mb-3" sm={6} md={4} lg={2}>
                    <Card className="quick-link border-0" onClick={() => {this.openLink("https://esp41pehac.eschoolplus.powerschool.com/HomeAccess/Account/LogOn?SiteCode=wyllive")}}>
                        <Card.Img variant="top" src="https://play-lh.googleusercontent.com/A6JX8M93sQWQwcTsgQnI1QFwGSRCh4o0dPiXosTSc9l5JiUVLLfpej7v8ezskx8OvQDw" />
                        <Card.Body className="text-center">
                            <span>eSchool HAC</span>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="mb-3" sm={6} md={4} lg={2}>
                    <Card className="quick-link border-0"  onClick={() => {this.openLink("https://wps.itslearning.com/")}}>
                        <Card.Img variant="top" src="https://lh3.googleusercontent.com/-7K49NzZj0-U/W6SjZsdvDDI/AAAAAAAAAAY/-mSWE_cIZmQ1b8UmuWWOygi9S6Uq1KTqACLcBGAs/itsl.png" />
                        <Card.Body className="text-center">
                            <span>itsLearning</span>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="mb-3" sm={6} md={4} lg={2}>
                    <Card className="quick-link border-0" onClick={() => {this.openLink("https://classroom.google.com/")}}>
                        <Card.Img variant="top" src="https://i.pinimg.com/originals/98/d3/a2/98d3a283f98cded8e639957e935bd373.png" />
                        <Card.Body className="text-center">
                            <span>G Classroom</span>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="mb-3" sm={6} md={4} lg={2}>
                    <Card className="quick-link border-0" onClick={() => {this.openLink("http://www.waylandschoolmeals.com/")}}>
                        <Card.Img variant="top" src="https://i.imgur.com/SUvtqGW.png" />
                        <Card.Body className="text-center">
                            <span>Lunch Menu</span>
                        </Card.Body>
                    </Card>
                </Col> 
                <Col className="mb-3" sm={6} md={4} lg={2}>
                    <Card className="quick-link border-0" onClick={() => {this.openLink("https://docs.google.com/forms/d/e/1FAIpQLSd92KAP0xtEmPgVye_v4Q_5u_yyow-cKCBRdkFQo84GKa9OPw/viewform")}}>
                        <Card.Img variant="top" src="https://cdn.zapier.com/storage/services/2554f3f9544cf8375a46f68b18de0e7d.png" />
                        <Card.Body className="text-center">
                            <span>Lunch Order Form</span>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="mb-3" sm={6} md={4} lg={2}>
                    <Card className="quick-link border-0"  onClick={() => {this.openLink("https://docs.google.com/document/d/1qpmy1Gp6tY5P8dMe64B_tHweEP-woB5-Ib5VbQPBKPo/edit")}}>
                        <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Closed_Book_Icon.svg/400px-Closed_Book_Icon.svg.png" />
                        <Card.Body className="text-center">
                            <span>Library Reservation</span>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="mb-3" sm={6} md={4} lg={2}>
                    <Card className="quick-link border-0" onClick={() => {this.openLink("https://student.naviance.com/waylandhs")}}>
                        <Card.Img variant="top" src="https://b8w9e5v9.rocketcdn.me/wp-content/uploads/2019/12/Naviance-Logo-300x300.png" />
                        <Card.Body className="text-center">
                            <span>Naviance</span>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="mb-3" sm={6} md={4} lg={2}>
                    <Card className="quick-link border-0" onClick={() => {this.openLink("https://sites.google.com/wayland.k12.ma.us/guidance/home")}}>
                        <Card.Img variant="top" src="https://is1-ssl.mzstatic.com/image/thumb/Purple123/v4/82/08/40/82084069-db0e-47bb-4740-c4377b8ed9ea/source/512x512bb.jpg" />
                        <Card.Body className="text-center">
                            <span>WHS Guidance</span>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="mb-3" sm={6} md={4} lg={2}>
                    <Card className="quick-link border-0" onClick={() => {this.openLink("https://docs.google.com/document/d/1pOcV5tdRxvjczc66fsoxrfXWMvEdcCspkgBAc1Vspc8")}}>
                        <Card.Img variant="top" src="https://cdn.imgbin.com/3/14/15/imgbin-google-docs-doc-s-YXrPzx5LvF1FkUvUcNL2cSbgz.jpg" />
                        <Card.Body className="text-center">
                            <span>Phase 2 Plan</span>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="mb-3" sm={6} md={4} lg={2}>
                    <Card className="quick-link border-0" onClick={() => {this.openLink("https://docs.google.com/spreadsheets/d/1Md5WSMwb3n2f5nqw1HG7Bx4EfJ2xpQxIEtgrDoxhPM8/edit")}}>
                        <Card.Img variant="top" src="https://image.flaticon.com/icons/png/512/126/126790.png" />
                        <Card.Body className="text-center">
                            <span>Blank Schedule</span>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>   
    }
}