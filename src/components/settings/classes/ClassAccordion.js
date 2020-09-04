import React from "react";
import { Card, Accordion, Form, Col } from "react-bootstrap";

export default function ClassAccordion(props) {
    return (
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey={props.period}>
                Period {props.period}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={props.period}>
                <Card.Body>
                    <Form.Row>
                        <Form.Group as={Col} xs={12} sm={6} className="d-block">
                            <Form.Label>Class</Form.Label>
                            <Form.Control type="text" placeholder="Class name" name={"period" + props.period + "-class"} defaultValue={props.classSettings != null ? props.classSettings.class : ""}/>
                        </Form.Group>

                        <Form.Group as={Col} xs={12} sm={6} className="d-block">
                            <Form.Label>Teacher</Form.Label>
                            <Form.Control type="text" placeholder="Teacher name" name={"period" + props.period + "-teacher"} defaultValue={props.classSettings != null ? props.classSettings.teacher : ""}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Group className="d-block">
                        <Form.Label>Meeting Link</Form.Label>
                        <Form.Control type="text" placeholder="Zoom/Google Meet Link" name={"period" + props.period + "-link"} defaultValue={props.classSettings != null ? props.classSettings.link : ""}/>
                    </Form.Group>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    );
}