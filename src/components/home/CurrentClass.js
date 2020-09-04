import React from "react";
import { Card } from "react-bootstrap";

export default function CurrentClass(props) {
    return (
        <Card className="w-100" bg="light">
            <Card.Header as="h3">Current Class: <b>{props.class.class}</b></Card.Header>
            <Card.Body>
                <Card.Text>
                Teacher: {props.class.teacher}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}