import React from "react";
import { Row, Col, Image, Jumbotron, Card} from "react-bootstrap";
import logo from '../../images/WHSRemote.png';
import mingle from '../../images/mingle.jpg';

export class AboutPage extends React.Component {
    render() {
        return (
            <section>
                <Row>
                    <Col className="justify-content-center">
                        <Jumbotron className="text-center">
                            <h1><b>About Me &amp; WHSRemote</b></h1>
                        </Jumbotron>
                    </Col>
                </Row>
                <div className="w-100 mb-5"><hr/></div>
                <Row className="justify-content-center">
                    <Col xs={12} sm={4}>
                        <Image src={mingle} alt="WHSRemote logo" className="w-100 mb-3" roundedCircle/>
                    </Col>
                    <Col xs={12} sm={8} className="text-center text-sm-left flex flex-row align-items-center">
                        <div>
                        <h1>Hey! I'm Mingle.</h1>
                        <div className="w-100"><hr/></div>
                        <h4 style={{lineHeight: "1.75"}}>I'm the creator of WHSRemote. I had the idea to do this because remote learning during the spring of 2020 was hectic with all the Zoom links for every class. I even mixed up two links and missed history (sorry, Mr. Delaney). I thought about WayTab (shoutout to Andy and Andrew) and figured that I could make something like it, but for remote learning specifically. So, here we are!</h4>
                        </div>
                    </Col>
                </Row>
                <div className="w-100 mb-5"><hr/></div>
                <Row className="flex flex-row">
                    <Col xs={12} sm={6} className="flex flex-col">
                        <Card className="text-center mb-3 flex-1">
                            <Card.Header as="h4">How long did it take?</Card.Header>
                            <Card.Body>
                                <Card.Title>Two weeks, right before the start of school. Those were two weeks that I should've spent on my summer homework.</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xs={12} sm={6} className="flex flex-col">
                        <Card className="text-center mb-3 flex-1">
                            <Card.Header as="h4">What tech stack did you use?</Card.Header>
                            <Card.Body>
                                <Card.Title>React for the frontend (hosted on Firebase), Spring Boot for the backend (hosted on Azure), and MySQL for DB (also Azure).</Card.Title>
                                <Card.Text><a href="https://github.com/whsremote" target="_blank">Check out the code!</a></Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="flex flex-row">
                    <Col xs={12} sm={6} className="flex flex-col">
                        <Card className="text-center mb-3 flex-1">
                            <Card.Header as="h4">How did you do it?</Card.Header>
                            <Card.Body>
                                <Card.Title>I learned security and server stuff in a software internship. I learned React in another software internship. Everything else has been a cumulation of my knowledge over the years.</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xs={12} sm={6} className="flex flex-col">
                        <Card className="text-center mb-3 flex-1">
                            <Card.Header as="h4">How can I do it?</Card.Header>
                            <Card.Body>
                                <Card.Title>Everybody should try computer science once. You can start by learning programming concepts <a href="https://www.codecademy.com/learn/learn-how-to-code" target="_blank">here</a> or jumping into Python <a href="https://www.learnpython.org/en/Hello%2C_World%21" target="_blank">here!</a></Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </section>
        );
    }
}