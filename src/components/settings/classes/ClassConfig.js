import React from "react";
import { Card, Accordion, Form, Col } from "react-bootstrap";

export default function ClassConfig(props) {
    return (
        <>
        <Card bg="light" className="p-2 mb-3">
            <Form.Row>
                <Form.Group as={Col} xs={12} sm={1}>
                    <Form.Label>Period</Form.Label>
                    <Form.Control as="select" defaultValue={props.classSettings != null ? props.classSettings.period : 1} onChange={(event) => { props.changeClassData(props.id, "period", event.target.value) }}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group as={Col} xs={12} sm={3} className="d-block">
                    <Form.Label>Class</Form.Label>
                    <Form.Control type="text" placeholder="Class name" name={"period" + props.period + "-class"} defaultValue={props.classSettings != null ? props.classSettings.class : ""} onChange={(event) => { props.changeClassData(props.id, "class", event.target.value) }} />
                </Form.Group>

                <Form.Group as={Col} xs={12} sm={3} className="d-block">
                    <Form.Label>Teacher</Form.Label>
                    <Form.Control type="text" placeholder="Teacher name" name={"period" + props.period + "-teacher"} defaultValue={props.classSettings != null ? props.classSettings.teacher : ""} onChange={(event) => { props.changeClassData(props.id, "teacher", event.target.value) }}/>
                </Form.Group>

                <Form.Group as={Col} xs={12} sm={5}>
                    <Form.Label>Meeting Link</Form.Label>
                    <Form.Control type="text" placeholder="Zoom/Google Meet Link" name={"period" + props.period + "-link"} defaultValue={props.classSettings != null ? props.classSettings.link : ""} onChange={(event) => { props.changeClassData(props.id, "link", event.target.value) }} />
                </Form.Group>
            </Form.Row>
            
        </Card>
        
        </>
    );
}